import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from "src/app/shared/services/user.service";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { User } from "src/app/shared/model/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isChecked=false;
  isError : boolean = false;
  loadingHidden=true;
  errorMessage:string='Podczas rejestracji wystąpił błąd'

    registerForm: FormGroup;
    formErrors = {
      name:'',
      surname:'',
      email: '',
      password: '',
      confirmPassword:''
    };
    validationMessages = {
      name: {
        required: 'Pole jest wymagane'
      },
      surname: {
        required: 'Pole jest wymagane'
      },
      email: {
        required: 'Przykładowo janusz.kowalski@gmail.com',
        email: 'Podano niepoprawny adres email'
      },
      password: {
        required: 'Przykładowo Anna123!',
        pattern: 'Hasło nie spełnia ograniczeń ',
        minlength: 'Minimalna długość hasła to 6 znaków',
        maxlength: 'Maksymalna długość hasła to 25 znaków'
      },
      confirmPassword: {
        required: 'Pole jest wymagane'
      }
    };
  
    constructor(
      private userService : UserService,
      private router: Router,
      private fb: FormBuilder,
    ) {}
  
    ngOnInit() {
      this.buildForm();
    }
  
    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }     
  }

    buildForm() {
      this.registerForm = this.fb.group({
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,25}$'),
            Validators.minLength(6),
            Validators.maxLength(25)
          ]
        ],
        confirmPassword: [
          '',[Validators.required]
        ]
      }, {validator: this.checkPasswords });
  
      this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
    }
  
    onChange(event) {
      this.isChecked=!this.isChecked;
           
    }

    onValueChanged(data?: any) {
      if (!this.registerForm) {
        return;
      }
      const form = this.registerForm;
      for (const field in this.formErrors) {
        if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
  
    
    register() {
      this.isError=false;
      var user:User = new User();
      user.Email=this.registerForm.value['email'];
      user.Password=this.registerForm.value['password'];
      user.FirstName=this.registerForm.value['name'];
      user.LastName=this.registerForm.value['surname'];
      this.loadingHidden=false;
      this.userService.registerUser(user).subscribe((data: any) => {
        this.loadingHidden=true;
        if (data.message == "REGISTERED SUCCESSFULLY") {
          console.log('User registration successful');
          this.router.navigate(['/confirm',{email: user.Email}]);
        }
        else
          {
            this.isError=true;
          }
         
      },
      (err : HttpErrorResponse)=>{
        this.loadingHidden=true;
        this.errorMessage="Podano niepoprawny email ";
        this.isError = true;
        console.log(err);
        
      });
    }

}
