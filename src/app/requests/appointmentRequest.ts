import { DB_FULL_DATE_FORMAT } from './../constants/app.constants';
import { Appointment } from '../modals/appointment';
import * as moment from 'moment';


export class AppointmentRequest {
  // patientId?: string;
  id?:string;
  clinicId?: string;
  appointmentPurpose?: string;
  remark?: string;
  startDate?: string;
  duration?: number;
  status: string;
  forceAdd: true; // bypasses backend 1 hour constraint
  patientIdentifier:string;
  name:string;
  userId: UserId;
  contactNumber: ContactNumber;
  preRegistration:preRegistration


  constructor(appointment: Appointment) {
    // this.patientId = appointment.patientId;
if(appointment.id){
  this.id=appointment.id;
}
    this.clinicId = appointment.clinicId;
    this.appointmentPurpose = appointment.purposeOfVisit;
    this.remark = appointment.remarks;
    this.startDate = moment(appointment.visitDate).format(DB_FULL_DATE_FORMAT);
    this.duration = appointment.duration;
    this.status = appointment.status;
    this.forceAdd = true;
    this.patientIdentifier=appointment.patientIdentifier;
    this.contactNumber=appointment.contactNumber;
    this.preRegistration=appointment.preRegistration;
    this.userId=appointment.userId;
    this.name=appointment.name;
  }


  
  setReferral(referringClinic?, referringDoctor?) {
    let isReferral: boolean;
    if (referringClinic !== this.clinicId) {
      isReferral = true;
    } else {
      isReferral = false;
    }

    if (isReferral) {
      this['referringDoctorId'] = referringDoctor; // Variable to be added
      this['referringClinicId'] = referringClinic;
    } else {
      this['referringClinicId'] = referringClinic;
    }
  }
  setDoctor(doctor) {
    if (doctor) {
      this['doctorId'] = doctor;
    }
  }
}
export interface UserId {
  idType: string;
  number: string;
}
export interface ContactNumber {
  number: string;
}

export interface preRegistration {
  purposeOfVisit: string;
  clinicCode: string;
  type: string;
  expectedArrivalTime: string;

}