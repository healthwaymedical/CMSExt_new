import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';
import { UserLogin } from '../modals/user';
import { HttpResponseBody } from '../modals/HttpResponseBody';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private API_LOGIN_URL;
  constructor(private http:HttpClient) { 
    this.API_LOGIN_URL = baseUrl;

  }
  login(user: UserLogin) {
    return this.http.post(`${this.API_LOGIN_URL}/aacore/login`, JSON.stringify(user), {
      observe: 'response',
    });
  }

  getUser(): Observable<HttpResponseBody>{
    let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
        httpHeaders.set('Content-Type', 'application/json');    
        let options = {headers:httpHeaders};    
    return this.http.post<HttpResponseBody>(`${this.API_LOGIN_URL}/aacore/user`,'');
  }
  loggedIn(){
    return !! localStorage.getItem("access_token");
  }
  getToken(){
    return localStorage.getItem("access_token");
  }
}

