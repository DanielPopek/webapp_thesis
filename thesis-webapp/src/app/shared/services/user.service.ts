import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { User } from "src/app/shared/model/user.model";


@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: any = {
      professionTypeId: Number(user.ProfessionType),
      password: user.Password,
      email: user.Email,
      firstName: user.FirstName,
      lastName: user.LastName
    }

    const body2: any = {
      "email": String(user.Email),
      "password": String(user.Password),
      "firstName": String(user.FirstName),
      "lastName": String(user.LastName),
      "professionTypeId": Number(user.ProfessionType)
    }
    console.log(body2);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/supervisor/register', body2, { headers: reqHeader });
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var data = '{"login":"' + userName + '","password":"' + password + '"}'
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
   // return this.http.post(this.rootUrl + '/loginSupervisor', data, { headers: reqHeader });
   //return {"status":"ok"};
  }


      // registerUser(user: User) {
    //   const body: any = {
    //     professionTypeId: Number(user.ProfessionType),
    //     password: user.Password,
    //     email: user.Email,
    //     firstName: user.FirstName,
    //     lastName: user.LastName
    //   }
  
    //   const body2: any = {
    //     "email": String(user.Email),
    //     "password": String(user.Password),
    //     "firstName": String(user.FirstName),
    //     "lastName": String(user.LastName),
    //     "professionTypeId": Number(user.ProfessionType)
    //   }
    //   console.log(body2);
    //   var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    //   return this.http.post(this.rootUrl + '/supervisor/register', body2, { headers: reqHeader });
    // }
  
    // userAuthentication(userName, password) {
    //   var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    //   var data = '{"login":"' + userName + '","password":"' + password + '"}'
    //   var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    //  // return this.http.post(this.rootUrl + '/loginSupervisor', data, { headers: reqHeader });
    //  //return {"status":"ok"};
    // }

    // getPatientsOfSupervisor(){
    //     var apiKey = localStorage.getItem('userToken');
    //     console.log('Service');
    //     console.log(apiKey);
    //     var reqHeader = new HttpHeaders({'Content-Type': 'application/json','No-Auth':'True', 'Authorization': apiKey });
    //     //reqHeader.set('Authorization', apiKey );
    //     return  this.http.get(this.rootUrl +'/supervisor/patients',{ headers: reqHeader });
    //   }

}
