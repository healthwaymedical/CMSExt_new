import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, } from 'ngx-bootstrap/modal'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AppointmentNewComponent } from '../appointment-new/appointment-new.component';
import { ApiAppointmentService } from '../../services/api-appointment.service';
import { Appointment, DoctorAvailableSlots, DateTimeSlots } from '../../modals/appointment';
import { DISPLAY_DATE_TIME_NO_SECONDS_FORMAT, DB_FULL_DATE_FORMAT, DISPLAY_TIME_NO_SECONDS_FORMAT, DISPLAY_TIME_NO_SECONDS_24_FORMAT, DISPLAY_DATE_FORMAT, DB_VISIT_DATE_FORMAT, CLINICS_ARRAY } from '../../constants/app.constants';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { AppointmentEditComponent } from '../appointment-edit/appointment-edit.component';
import { Clinic } from '../../modals/clinic';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';



@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  clickEventSubscription: Subscription;
  token: string;
  name: string;
  appointmentDate: any;
  public allAppointments = [];
  tableview: boolean = true;
  ViewButtonText: string = "Calendar View";
  minDate: Date;
  maxDate: Date;
  clinics: Array<Clinic>;
  selectedAttributes: string;
  constructor(
    private router: Router,
    private modalService: BsModalService,
    private sharedService: SharedService,
    private apiAppointmentService: ApiAppointmentService,

  ) {
    this.clickEventSubscription=this.sharedService.getClickEvent().subscribe(()=>{
      this.getAppointmentsAll();
    })
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 0);
    this.maxDate.setDate(this.maxDate.getDate() + 90);

  }
  ngOnInit(): void {
    this.populateData();
  }

  private populateData() {
    this.clinics = CLINICS_ARRAY;
    localStorage.setItem('clinicId', CLINICS_ARRAY[0].id);
    localStorage.setItem('clinicCode', CLINICS_ARRAY[0].clinicCode);
    this.selectedAttributes = CLINICS_ARRAY[0].id;
    this.getAppointmentsAll();
  }


  onChangeClinic(selectedClinic) {
    if (selectedClinic != undefined && selectedClinic != null) {
      localStorage.setItem('clinicId', selectedClinic.id);
      localStorage.setItem('clinicCode', selectedClinic.clinicCode);
      this.getAppointmentsAll();
      this.sharedService.sendClickEvent();
    }

  }
  changeToCalendar() {
    if (this.tableview) {
      this.tableview = false;
      this.ViewButtonText = "Table View";
    } else {
      this.tableview = true;
      this.ViewButtonText = "Calendar View";
    }


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
        this.allAppointments.forEach(appointment => {
          appointment.startDate = moment(appointment.startDate, DB_FULL_DATE_FORMAT).format(
            DISPLAY_DATE_TIME_NO_SECONDS_FORMAT
          );

          tempAPpointmentArray.push(appointment)
        });
        this.allAppointments = tempAPpointmentArray;

      },
      err => {
        // this.alertService.error(JSON.stringify(err.error.message));
      }
    );
  };
  public editAppointment(appointment) {
    this.openModalAppointmentEdit(appointment);

    // this.modalRef=this.modalService.show(template)
  };

  deleteAppointment(appointment) {

    if (this.confirmDelete()) {
      this.apiAppointmentService
        .remove(appointment.id)
        .subscribe(res => {

          this.getAppointmentsAll();
        });
    }

  }

  confirmDelete() {
    const isDelete = confirm('Delete appointment?');
    return isDelete;
  }
  openModalAppointmentNew() {
    const initialState = {
      title: 'New Appointment'
    };

    this.modalService.show(AppointmentNewComponent, {
      initialState,
      class: 'modal-lg',
      backdrop: 'static',
    });
  }

  openModalAppointmentEdit(appointment: Appointment) {
    const initialState = {
      title: 'Edit Appointment',
      appointmentDate: appointment.startDate,
      appointmentId: appointment.id
    };

    this.modalService.show(AppointmentEditComponent, {
      initialState,
      class: 'modal-md',
      backdrop: 'static',
    });
  }







}

