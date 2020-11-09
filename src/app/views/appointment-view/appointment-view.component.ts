
import {Component,OnInit,ChangeDetectionStrategy,ViewChild,TemplateRef} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours, addMinutes} from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarMonthViewDay,
  CalendarMonthViewBeforeRenderEvent,
  CalendarEventTitleFormatter,
  CalendarDayViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,

} from 'angular-calendar';
import * as moment from 'moment';
import { DB_VISIT_DATE_FORMAT, DISPLAY_DATE_TIME_NO_SECONDS_FORMAT, DB_FULL_DATE_FORMAT, DB_FULL_DATE_TIMEZONE_Z, INVENTORY_DATE_FORMAT, DB_FULL_DATE_TIMEZONE_NO_SPACE, DISPLAY_TIME_NO_SECONDS_24_FORMAT, DISPLAY_DATE_FORMAT, DB_FULL_DATE_TIMEZONE_NO_SPACE_REVERSEC } from '../../constants/app.constants';
import { ApiAppointmentService } from '../../services/api-appointment.service';
import { AppointmentEditComponent } from '../appointment-edit/appointment-edit.component';
import { BsModalService, } from 'ngx-bootstrap/modal'
import { SharedService } from '../../services/shared.service';
import { ToastrService } from 'ngx-toastr';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})
export class AppointmentViewComponent implements OnInit {
  clickEventSubscription: Subscription;
  public allAppointments = [];
  public eventsArray=[];
  minDate: Date;
  maxDate: Date;
  calendarAppointment$ :CalendarEvent[];
  isExternalClinic$;
  viewDate$;
  modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  constructor(
    private toastr: ToastrService,
    private modal: NgbModal,
    private modalService: BsModalService,
    private sharedService:SharedService,
    private apiAppointmentService: ApiAppointmentService,
  ) { 
    this.clickEventSubscription=this.sharedService.getClickEvent().subscribe(()=>{
      this.getAppointmentsAll();
    })
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 0);
    this.maxDate.setDate(this.maxDate.getDate() + 90);
    this.getAppointmentsAll();
  }


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.calendarAppointment$ = this.calendarAppointment$.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
 
  ngOnInit() {

    
  }


  getAppointmentsAll() {

    let clinicId = localStorage.getItem("clinicId");
    let startDate = moment(this.minDate).format(
      DB_VISIT_DATE_FORMAT
    );


    let endDate = moment(this.maxDate).format(
      DB_VISIT_DATE_FORMAT
    );
    this.apiAppointmentService.getAppointments(clinicId, startDate, endDate).subscribe(
      res => {
        this.allAppointments = res.payload;

        let tempAPpointmentArray = [];
        let tempeventsArray = [];
    
        this.allAppointments.forEach(appointment => {
          appointment.startDate = moment(appointment.startDate, DB_FULL_DATE_FORMAT).format(
            DISPLAY_DATE_TIME_NO_SECONDS_FORMAT
          );


          let timeOnly = moment(appointment.startDate,DISPLAY_DATE_TIME_NO_SECONDS_FORMAT).format(
            DISPLAY_TIME_NO_SECONDS_24_FORMAT
          );
      
          let dateOnly = moment(appointment.startDate, DISPLAY_DATE_FORMAT).format(
            DISPLAY_DATE_FORMAT
          );
          let calendarstartdate=moment(dateOnly, DB_FULL_DATE_FORMAT).format(
            INVENTORY_DATE_FORMAT
          );


          calendarstartdate=calendarstartdate+"T"+timeOnly;
     
          tempAPpointmentArray.push(appointment)
        var obj={
          id:appointment.id,
          start:  new Date(calendarstartdate),
          end: new Date(calendarstartdate),
          title: appointment.patientName+"-("+timeOnly+")",
          color: colors.red,
          actions: this.actions,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: false

        }
       tempeventsArray.push(obj);
        });
        this.allAppointments = tempAPpointmentArray;
        this.eventsArray=tempeventsArray;
        this.calendarAppointment$=tempeventsArray;
        this.refresh.next();
      },
      err => {
        this.toastr.error(err.error.message)

      }
    );
  };

  


  // events: CalendarEvent[] = 
  // [
    
  //   {
  //     start: addDays(new Date(), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'Event 1',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: false,
  //       afterEnd: false
  //     },
  //     draggable: true
  //   },
  //   {
  //     start: addDays(new Date(), 2),
  //     end: addDays(new Date(), 2),
  //     title: 'Event 1',
  //     color: colors.yellow,
  //     actions: this.actions
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(startOfDay(new Date()), 6),
  //     title: 'event 44',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];
  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }


  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    // this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {



    if(action=="Edited"){

     
let dateone= moment(event.start, DB_FULL_DATE_FORMAT).format(
        DISPLAY_DATE_TIME_NO_SECONDS_FORMAT
      );
      
      const initialState = {
        title: 'Edit Appointment',
        appointmentDate: dateone,
        appointmentId:event.id
      };
  
      this.modalService.show(AppointmentEditComponent, {
        initialState,
        class: 'modal-md',
        backdrop: 'static',
      });
    }else if(action=="Deleted"){
      if (this.confirmDelete()) {
        this.apiAppointmentService
          .remove(event.id)
          .subscribe(res => {
     
            this.getAppointmentsAll();
            this.activeDayIsOpen=false;
            this.sharedService.sendClickEvent();
          });
      }


    }
    // this.modalData = { event, action };
  //  this.modal.open(this.modalContent, { size: 'lg' });
  }
  confirmDelete() {
    const isDelete = confirm('Delete appointment?');
    return isDelete;
  }
  addEvent(): void {
    this.calendarAppointment$.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();

  }


  beforeMonthViewRender(
    { body }: { body: CalendarMonthViewDay[] },
    viewRender: CalendarMonthViewBeforeRenderEvent
  ): void {
    body.forEach(cell => {
      const toDisplay: any = [];
      let remaining: number = 0;
      cell.events.forEach((event: CalendarEvent, index) => {
        const limit = 4;

        if (index >= 0 && index < limit) {
          toDisplay.push(event);
        } else {
          remaining = cell.events.length - limit;
        }
        cell['toDisplay'] = toDisplay;
        cell['remaining'] = remaining;
      });
    });
  }

  

}
