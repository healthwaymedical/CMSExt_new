
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
  private API_LOGIN_URL;
  constructor(private http:HttpClient) { 
    this.API_LOGIN_URL = baseUrl;

  }

  getTimeSlots(clinicId:any, appointmentDate:any): Observable<HttpResponseBody>{  
    return this.http.post<HttpResponseBody>(`${this.API_LOGIN_URL}/cms-dua/appointment/available/time-slot/${clinicId}/${appointmentDate}`,[]);
  }

}

