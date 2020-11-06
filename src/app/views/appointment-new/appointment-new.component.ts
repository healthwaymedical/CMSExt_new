import { Component, OnInit } from '@angular/core';
import {BsModalService, BsModalRef,} from 'ngx-bootstrap/modal'
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { DISPLAY_DATE_FORMAT, CLINICS_ARRAY, DISPLAY_TIME_NO_SECONDS_24_FORMAT } from '../../constants/app.constants';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {AppointmentFormService} from '../../services/appointment-form.service';
import { Clinic } from '../../modals/clinic';
import { IdTypes } from '../../modals/idTypes';
import { ApiAppointmentService } from '../../services/api-appointment.service';
import { DoctorAvailableSlots, DateTimeSlots } from '../../modals/appointment';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrls: ['./appointment-new.component.scss']
})
export class AppointmentNewComponent implements OnInit {
  title: string;
  bsConfig: Partial<BsDatepickerConfig>;
  minDate: Date;
  maxDate: Date;
  appointmentForm: FormGroup;
  isSaving = false;
  isedit=false;
  clinics: Array<Clinic>;
  idTypes:Array<IdTypes>;
  phoneType=[];
  nextAppointment = "";
  availableTimes: Array<DoctorAvailableSlots>;
  availableTimesDropDownList: Array<string>;
  
  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private appointmentsFormService:AppointmentFormService,
    private apiAppointmentService: ApiAppointmentService,
    private utilsService: UtilsService
    ) {

      this.minDate = new Date();
      this.maxDate = new Date();
      this.minDate.setDate(this.minDate.getDate() - 1);
      this.maxDate.setDate(this.maxDate.getDate() + 7);
      this.appointmentForm = this.createAppointmentFormGroup();
    }

  ngOnInit() {
this.configureDatePicker();
this.populateData();
this.getTimeSlots();
  }

  private populateData() {
    // this.clinics =     this.store.getClinicList();
    this.clinics =     CLINICS_ARRAY;
    localStorage.setItem('clinicId', CLINICS_ARRAY[0].id);
    let appointmentDate= moment(new Date()).format(
      DISPLAY_DATE_FORMAT
    )
     localStorage.setItem("appointmentDate",appointmentDate)
    this.idTypes=[
      { value: 'NRIC_PINK', label: 'NRIC (Pink)' },
      { value: 'NRIC_BLUE', label: 'NRIC (Blue)' },
      { value: 'MIC', label: 'Malaysian IC' },
      { value: 'FIN', label: 'FIN' },
      { value: 'PASSPORT', label: 'Passport' },
      { value: 'OTHER', label: 'Other' },
    ];
    this.phoneType=[
      "Mobile","Home"
    ]
    this.setMandatoryFields();
  }
  configureDatePicker() {
    this.bsConfig = Object.assign({}, {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD/MM/YYYY',  
      isAnimated: true ,
      minDate:this.minDate,
      maxDate:this.maxDate,
      // daysDisabled:[6,0]
      // placement="top"
      returnFocusToInput: true
      
      });
  }

  onChangeClinic(selectedClinic) {
    localStorage.setItem('clinicId', selectedClinic.id);
    localStorage.setItem('clinicCode',selectedClinic.clinicCode)
}

onChangeTime(selectedTime) {

}



onchangeAppointmentDate(value: Date): void {

  

  this.appointmentForm.patchValue({
    startTime:"",
  });


if(value==null || value==undefined){

}else{
  localStorage.setItem("appointmentDate", moment(value).format(
    DISPLAY_DATE_FORMAT
  ))
  this.getTimeSlots();
}

}

  createAppointmentFormGroup(): FormGroup {
    return this.fb.group({
      appointmentDate: ['', Validators.required],
      patientIdentifier:['', Validators.required],
      name:['', Validators.required],
    });
   
  }

  setMandatoryFields() {
    this.appointmentsFormService.setMandatoryFields(
      this.appointmentForm,
    );
  }
  closeModalBox(){
    let datepicked= moment(this.appointmentForm.get('appointmentDate').value).format(
      DISPLAY_DATE_FORMAT
    )
    this.bsModalRef.hide();
  }

  closeModalBoxCancel(){
    this.bsModalRef.hide();
  }


getTimeSlots(){
  this.availableTimes = new Array<DoctorAvailableSlots>();
  let clinicId=localStorage.getItem("clinicId");
  let appointmentDate=localStorage.getItem("appointmentDate");
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
      moment(this.appointmentForm.get('appointmentDate').value).format(
        DISPLAY_DATE_FORMAT
      )
    );
    this.availableTimesDropDownList = this.mergeArray(
      this.availableTimesDropDownList,
      availableTimes
    );
  });

console.log("here is timeslots", JSON.stringify( this.availableTimesDropDownList));
}
getVisitTime() {
  const date: Date = this.appointmentForm.get('appointmentDate').value as Date;
  const time = this.utilsService.convertDateToTime(date);

  if (this.availableTimesDropDownList) {
    const availableTimeSlot = this.availableTimesDropDownList.find(
      timeOption => {
        return moment(
          timeOption,
          DISPLAY_TIME_NO_SECONDS_24_FORMAT
        ).isSameOrAfter(moment(time, DISPLAY_TIME_NO_SECONDS_24_FORMAT));
      }
    );

    if (availableTimeSlot === undefined) {
      return this.utilsService.convertDateToTime(date);
    } else {
      return availableTimeSlot;
    }
  }
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
}
