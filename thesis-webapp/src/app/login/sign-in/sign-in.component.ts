import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from "src/app/shared/services/user.service";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  // constructor(private userService : UserService,private router : Router) { }

  // ngOnInit() {
  // }

  // OnSubmit(userName,password){
  //    this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
  //     localStorage.setItem('userToken',data.apiKey);
  //     console.log(data.apiKey)
  //     this.router.navigate(['/home']);
  //   },
  //   (err : HttpErrorResponse)=>{
  //     this.isLoginError = true;
  //     console.log(err);
      
  //   });
  // }
  userForm: FormGroup;
  formErrors = {
    email: '',
    password: ''
  };
  validationMessages = {
    email: {
      required: 'Przykładowo janusz.kowalski@gmail.com',
      email: 'Podano niepoprawny adres email'
    },
    password: {
      required: 'Przykładowo Anna123!',
      pattern: 'Hasło nie spełnia ograniczeń ',
      minlength: 'Minimalna długość hasła to 6 znaków',
      maxlength: 'Maksymalna długość hasła to 25 znaków'
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

  buildForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
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

  signInWithGoogle() {
   // this.auth.googleLogin().then(() => this.afterSignIn());
  }

  signInWithGithub() {
   // this.auth.githubLogin().then(() => this.afterSignIn());
  }

  signInWithEmail() {
    // // this.auth
    // //   .emailLogin(this.userForm.value['email'], this.userForm.value['password'])
    //      this.userService.userAuthentication(this.userForm.value['email'],this.userForm.value['password']).subscribe((data : any)=>{
    //  // localStorage.setItem('userToken',data.apiKey);
    //   localStorage.setItem('userToken','12345');
    //   console.log(data.apiKey)
    //   this.router.navigate(['/home']);
    // },
    // (err : HttpErrorResponse)=>{
    //   this.isLoginError = true;
    //   console.log(err);
      
    // });

    localStorage.setItem('userToken','12345');
    this.router.navigate(['/home']);
  }

  signInAnonymously() {
    //this.auth.anonymousLogin().then(() => this.afterSignIn());
  }

  login() {
    this.signInWithEmail();
  }

  private afterSignIn() {
    this.router.navigate(['/']);
  }
}
