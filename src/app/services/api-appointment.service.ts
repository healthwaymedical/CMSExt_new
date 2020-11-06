
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';
import { UserLogin } from '../modals/user';
import { HttpResponseBody } from '../modals/HttpResponseBody';

@Injectable({
  providedIn: 'root'
})
export class ApiAppointmentService {
  private API_URL;
  constructor(private http:HttpClient) { 
    this.API_URL = baseUrl;

  }

  getTimeSlots(clinicId:any, appointmentDate:any): Observable<HttpResponseBody>{  
    return this.http.post<HttpResponseBody>(`${this.API_URL}/cms-dua/appointment/available/time-slot/${clinicId}/${appointmentDate}`,
    []);
  }

  create(appointment: any): Observable<HttpResponseBody> {
    var obj={
      "number":appointment.contactNumber
    }
    appointment.contactNumber=obj;
    console.log("requesting now here", JSON.stringify(appointment))
    // let httpHeaders = new HttpHeaders();
    // httpHeaders = httpHeaders.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    // httpHeaders.set('Content-Type', 'application/json');    
    // let options = {headers:httpHeaders};  
    return this.http.post<HttpResponseBody>(
      `${this.API_URL}/cms-dua/patient/pre-registration/create`,
      JSON.stringify(appointment)
    );
  }

}

