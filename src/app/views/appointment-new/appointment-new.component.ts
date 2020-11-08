import { Component, OnInit } from '@angular/core';
import {BsModalService, BsModalRef,} from 'ngx-bootstrap/modal'
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { DISPLAY_DATE_FORMAT, CLINICS_ARRAY, DISPLAY_TIME_NO_SECONDS_24_FORMAT, APPOINTMENT } from '../../constants/app.constants';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {AppointmentFormService} from '../../services/appointment-form.service';
import { Clinic } from '../../modals/clinic';
import { IdTypes } from '../../modals/idTypes';
import { ApiAppointmentService } from '../../services/api-appointment.service';
import { DoctorAvailableSlots, DateTimeSlots, ContactNumber, UserId, PreRegistration } from '../../modals/appointment';
import { UtilsService } from '../../services/utils.service';

import { Appointment } from '../../modals/appointment';
import { SharedService } from '../../services/shared.service';
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

  clinics: Array<Clinic>;
  idTypes:Array<IdTypes>;
  phoneType=[];
  nextAppointment = "";
  availableTimes: Array<DoctorAvailableSlots>;
  availableTimesDropDownList: Array<string>;
  
clinicId:string;
name:string;
patientIdentifier:string;
contactNumber: ContactNumber;
userId:UserId;
preRegistration:PreRegistration;
alert:boolean=false;
success:boolean=false;
alertMessage:string;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private appointmentsFormService:AppointmentFormService,
    private apiAppointmentService: ApiAppointmentService,
    private utilsService: UtilsService,
    private sharedService:SharedService,
    ) {

      this.minDate = new Date();
      this.maxDate = new Date();
      this.minDate.setDate(this.minDate.getDate() - 0);
      this.maxDate.setDate(this.maxDate.getDate() + 90);
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
  localStorage.setItem('appointmentTime', selectedTime);
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
      appointmentDate: [''],
      patientIdentifier:[''],
      appointmentTime:[''],
      name:[''],
      idType:[''],
      idNumber:[''],
      contactNumber:['', Validators.required],
      remarks:['']
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

insertAppointment(){
  // this.username = this.loginFormGroup.get('userName').value;
  // this.password = this.loginFormGroup.get('password').value;
  // const user = new UserLogin(this.username, this.password);
  return this.appointmentsFormService.setAppointmentForApi(
    this.appointmentForm,
    false
  );

}

setFormGroupForSaveApi() {
  this.appointmentForm.patchValue({
    startTime:"",
  });
 
  return this.appointmentsFormService.setAppointmentForApi(
    this.appointmentForm,
    false
  );
}
createNewAppointment() {
  const appointment = this.setFormGroupForSaveApi();


  appointment.preRegistration.expectedArrivalTime= moment(this.appointmentForm.get('appointmentDate').value).format(
    DISPLAY_DATE_FORMAT
  )+"T"+localStorage.getItem("appointmentTime");
  this.apiAppointmentService.create(appointment).subscribe(
    res => {
 
      this.isSaving = false;

      this.success=true;
      this.alertMessage="APPOINTMENT CREATED SUCCESSFULLY";
      this.delay(2000).then(any=>{
        this.success=false;

   this.bsModalRef.hide();
      });
      console.log('APPOINTMENT CREATED SUCCESSFULLY');
      this.sharedService.sendClickEvent();
    },
    err => {
      this.alert=true;
      this.alertMessage=err;
      this.delay(2000).then(any=>{
        this.alert=false;
      });
      this.isSaving = false;
      // this.alertService.error(JSON.stringify(err));
     }
  );
}

async delay(ms: number) {
  await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}
}
