import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { User } from "src/app/shared/model/user.model";


@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const requestBody: any = {
      "email": String(user.Email),
      "password": String(user.Password),
      "firstName": String(user.FirstName),
      "lastName": String(user.LastName)
    }
    console.log(requestBody);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/authentication/register', requestBody, { headers: reqHeader });
  }

  userAuthentication(userName, password) {
    var data = '{"login":"' + userName + '","password":"' + password + '"}'
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/authentication/login', data, { headers: reqHeader });
  }
}
