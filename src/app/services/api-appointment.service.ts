
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';
import { UserLogin } from '../modals/user';
import { HttpResponseBody } from '../modals/HttpResponseBody';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiAppointmentService {
  private API_URL;
  constructor(private http:HttpClient) { 
    this.API_URL = baseUrl;

  }

  getTimeSlots(clinicCode:any, appointmentDate:any): Observable<HttpResponseBody>{  
    return this.http.post<HttpResponseBody>(`${this.API_URL}/cms-dua/patient/pre-registration/tele-consult/available/time-slot/${clinicCode}/${appointmentDate}`,
    ["EXT_APP_DUMMY_MCR"]);

    


  }

  getAppointments(clinicId:any, startDate:any, endDate:any): Observable<HttpResponseBody>{  
    let obj={
      "clinicId": clinicId!=null?clinicId:localStorage.getItem("clinicId"),
      "startDate":startDate,// "02-10-2020T22:45:00",
        "endDate":endDate
  }
    return this.http.post<HttpResponseBody>(`${this.API_URL}/cms-dua/patient/pre-registration/list/calendar`,JSON.stringify(obj));
  }


  updateAppointments(appointmentId:any, newDate:any): Observable<HttpResponseBody>{  
    let obj={
        "appointmentId": appointmentId,
        "action": "RESCHEDULED",
        "appointmentDate": newDate
  }
    return this.http.post<HttpResponseBody>(`${this.API_URL}/cms-dua/patient/pre-registration/update`,JSON.stringify(obj));
  }

  create(appointment: any): Observable<HttpResponseBody> {
    var obj={
      "number":appointment.contactNumber
    }
    appointment.contactNumber=obj;
    return this.http.post<HttpResponseBody>(
      `${this.API_URL}/cms-dua/patient/pre-registration/create`,
      JSON.stringify(appointment)
    );
  }


  

  remove(appointmentId:any): Observable<HttpResponseBody>{  

    return this.http.post<HttpResponseBody>(`${this.API_URL}/cms-dua/appointment/remove/${appointmentId}`,{});
  }

}

