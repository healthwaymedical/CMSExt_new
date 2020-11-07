import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DoctorAvailableSlots, DateTimeSlots, Appointment } from '../../modals/appointment';
import { BsModalService, BsModalRef, } from 'ngx-bootstrap/modal'
import { ApiAppointmentService } from '../../services/api-appointment.service';
import * as moment from 'moment';
import { DISPLAY_DATE_FORMAT, DISPLAY_TIME_NO_SECONDS_24_FORMAT } from '../../constants/app.constants';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {
  title: string;
  appointmentData: Appointment;
  bsConfig: Partial<BsDatepickerConfig>;
  minDate: Date;
  maxDate: Date;
  appointmentEditForm: FormGroup;
  availableTimes: Array<DoctorAvailableSlots>;
  availableTimesDropDownList: Array<string>;
  alertWarning: boolean = false;
  alertSuccess: boolean = false;
  alertMessage: string;
  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,

    private apiAppointmentService: ApiAppointmentService,

  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.appointmentEditForm = this.createAppointmentFormGroup();
  }

  ngOnInit() {

    this.setInitialAppointmentData(this.appointmentData);
    this.configureDatePicker();
  }


  setInitialAppointmentData(appointment: Appointment) {
    console.log("Appointment is here ", JSON.stringify(appointment.startDate));
    let timeOnly = moment(appointment.startDate).format(
      DISPLAY_TIME_NO_SECONDS_24_FORMAT
    );


    let dateOnly = moment(appointment.startDate, DISPLAY_DATE_FORMAT).format(
      DISPLAY_DATE_FORMAT
    );


    this.appointmentEditForm.patchValue({
      appointmentDate: dateOnly
    });
    this.getTimeSlots();
    this.appointmentEditForm.patchValue({
      appointmentDate: dateOnly,
      appointmentTime: timeOnly
    });
  }



  configureDatePicker() {
    this.bsConfig = Object.assign({}, {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD/MM/YYYY',
      isAnimated: true,
      minDate: this.minDate,
      maxDate: this.maxDate,
      // daysDisabled:[6,0]
      // placement="top"
      returnFocusToInput: true

    });
  }
  createAppointmentFormGroup(): FormGroup {
    return this.fb.group({
      appointmentDate: [''],
      appointmentTime: [''],
    });

  }

  onchangeAppointmentDate(value: Date): void {

    this.appointmentEditForm.patchValue({
      // appointmentTime:"",
      appointmentDate: moment(value).format(
        DISPLAY_DATE_FORMAT
      )
    });


    if (value == null || value == undefined) {

    } else {
      this.getTimeSlots();
    }

  }

  getTimeSlots() {
    this.availableTimes = new Array<DoctorAvailableSlots>();
    let clinicId = localStorage.getItem("clinicId");
    let appointmentDate = this.appointmentEditForm.get('appointmentDate').value;
    this.apiAppointmentService.getTimeSlots(clinicId, appointmentDate).subscribe(
      res => {
        res.payload.filter(slot => slot.timeSlot.length > 0).forEach(slot => {
          let timeSlots = new Array<string>();
          slot.timeSlot.forEach(time => {
            timeSlots.push(time.start);
          });
          const dateTime: DateTimeSlots = new DateTimeSlots(
            slot.timeSlot[0].calendarDayYear.date,
            timeSlots
          );
          const arrayDateTimeSlots = new Array<DateTimeSlots>();
          arrayDateTimeSlots.push(dateTime);

          const doctorAvailableSlots = new DoctorAvailableSlots(
            slot.doctorId,
            arrayDateTimeSlots
          );
          this.availableTimes.push(doctorAvailableSlots);
        });

        console.log('availableTimes: ', this.availableTimes);
        this.populateAvailableTimesDropdownList();
      },
      err => {
        // this.alertService.error(JSON.stringify(err.error.message));
      }
    );
  }

  populateAvailableTimesDropdownList() {
    this.availableTimesDropDownList = new Array<string>();
    this.availableTimes.forEach((time: DoctorAvailableSlots) => {
      const availableTimes = time.getTimeSlotsByDate(
        moment(this.appointmentEditForm.get('appointmentDate').value).format(
          DISPLAY_DATE_FORMAT
        )
      );
      this.availableTimesDropDownList = this.mergeArray(
        this.availableTimesDropDownList,
        availableTimes
      );
    });

    console.log("here is timeslots", JSON.stringify(this.availableTimesDropDownList));
  }

  mergeArray(array1, array2) {
    let resultArray = [];
    let arr = array1.concat(array2);
    let len = arr.length;
    let assoc = {};

    while (len--) {
      let item = arr[len];

      if (!assoc[item]) {
        resultArray.unshift(item);
        assoc[item] = true;
      }
    }
    return resultArray.sort();
  }


  onTimeSelect(selectedTime) {
    if (selectedTime != undefined && selectedTime != null) {
      this.appointmentEditForm.patchValue({
        appointmentTime: selectedTime
      });

    }

  }

  onSaveClick() {

    let newDate = moment(this.appointmentEditForm.get('appointmentDate').value).format(
      DISPLAY_DATE_FORMAT
    ) + "T" + this.appointmentEditForm.get('appointmentTime').value;
    //start
    let appointmentId = this.appointmentData.id;
    this.apiAppointmentService.updateAppointments(appointmentId, newDate).subscribe(
      res => {
        // this.allAppointments= res.payload;

        this.alertSuccess = true;
        this.alertMessage = "APPOINTMENT UPDATED SUCCESSFULLY";
        this.delay(2000).then(any => {
          this.alertSuccess = false;

          this.bsModalRef.hide();
        });
        console.log('APPOINTMENT CREATED SUCCESSFULLY');

      },
      err => {
        // this.alertService.error(JSON.stringify(err.error.message));
        this.alertWarning = true;
        this.alertMessage = err.error.message;
        this.delay(2000).then(any => {
          this.alertSuccess = false;
        });
        console.log('APPOINTMENT CREATED SUCCESSFULLY');
      }
    );
  }



  closeModalBox() {

    this.bsModalRef.hide();
  }


  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

}
