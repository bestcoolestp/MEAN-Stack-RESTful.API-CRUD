//to call REST API
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers:HttpHeaders;
  
  constructor(private client: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
  }

  GetUsers(): Observable<User[]> {
    return this.client.get(env.apiAddress + '/user') as Observable<User[]>;
  };
  
  GetUser(id:string): Observable<User> {
    return this.client.get(env.apiAddress + '/user/' + id) as Observable<User>;
  };

  AddUser(user: User): Observable<HttpResponse<any>> {
    return this.client.post(env.apiAddress + '/user/', JSON.stringify(user), {
  headers: this.headers, observe: 'response'});
  }

  UpdateUser(user: User): Observable<HttpResponse<any>> {
    return this.client.put(env.apiAddress + '/user/' + user._id, JSON.stringify(user), {
  headers: this.headers, observe: 'response'}); 
    };

  DeleteUser(id: string): Observable<HttpResponse<any>> {
    return this.client.delete(env.apiAddress + '/user/' + id, {
  headers: this.headers, observe: 'response'
    }) as Observable<HttpResponse<any>>;
  }
}