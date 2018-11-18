import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { User } from "src/app/shared/model/user.model";
import { UserService } from "src/app/shared/services/user.service";
import { ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";


@Component({
  // encapsulation: ViewEncapsulation.None,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isError : boolean = false;
  isChecked:boolean=false;
  errorMessage:string='Podczas rejestracji wystąpił błąd'
  passwordConfirm:string='';
  constructor(private userService: UserService,   private router: Router,private toastr: ToastrService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
  }


  onChange(event) {
    this.isChecked=!this.isChecked;
         
  }

  onConfirmChange(event) {
    // this.passwordConfirm=value;
         console.log(this.passwordConfirm);
  }

  validate()
  {
    if(this.user.Password!=this.passwordConfirm)
       {
        this.errorMessage="Nie zdagdzają się podane hasła";
        this.isError=true;
        return false;    
       }
       else return true;
  }

  OnSubmit(form: NgForm) {
    if(this.validate()){
      this.userService.registerUser(this.user)
      .subscribe((data: any) => {
        console.log("ONRETURN");
        console.log(data);
        if (data.message == "REGISTER SUCCESSFUL") {
          console.log('User registration successful');
          console.log(this.user);
          console.log(this.user.Email);
          this.router.navigate(['/confirm',{email: this.user.Email}]);
          this.resetForm(form);
        }
        else
          {
            this.toastr.success('ERROR');
            this.toastr.error(data);
            this.isError=true;

          }
         
      },
      (err : HttpErrorResponse)=>{
        this.errorMessage="Podano niepoprawny email lub hasło. Hasło musi składać się z wielkiej litery i cyfry";
        this.isError = true;
        console.log(err);
        
      });
    } 
  }



  

}
