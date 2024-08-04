import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {SignupService} from '../../services/username-password-signup/username-password-signup.service'
import { SamePasswordValidator } from '../../directives/validators/same-password.directive';
import { ServerUrlService } from '../../../shared/services/server-url/server-url.service';
import { UsernamePasswordSignUpResponse } from '../../pojo/username-password-signup-response';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { getCookie } from 'typescript-cookie';
import { GoogleSignUpResponse } from '../../pojo/google-signup-response';
import { StorageService } from '../../../shared/storage/storage.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: any = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), 
      Validators.pattern("^[0-9a-zA-Z]{2,16}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), 
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$")]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), 
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$")])
  }, {validators: SamePasswordValidator('password', 'confirm_password')})

  constructor (
    private signUpService: SignupService,
    private serverUrlService: ServerUrlService,
    private router: Router,
    private storageService: StorageService
  ) {}

  private serverUrl: string = this.serverUrlService.getUrl();
  public email_status: string = 'INVALID';
  public username_status: string = 'INVALID';
  public password_status: string = 'INVALID';
  public confirm_password_status: string = 'INVALID';

  ngOnInit(): void {
    this.signUpForm.get('email').valueChanges.subscribe( () => {
      this.email_status = this.signUpForm.get('email').status;
      console.log("email: ", this.email_status);
    });

    this.signUpForm.get('username').valueChanges.subscribe( () => {
      this.username_status = this.signUpForm.get('username').status;
      console.log("username: ", this.username_status);
    });

    this.signUpForm.get('password').valueChanges.subscribe( () => {
      this.password_status = this.signUpForm.get('password').status;
      console.log("password: ", this.password_status);
    });

    this.signUpForm.get('confirm_password').valueChanges.subscribe( () => {
      this.confirm_password_status = this.signUpForm.get('confirm_password').status;
      console.log("confirm_password: ", this.confirm_password_status);
    });

    const cookie: string = getCookie("signup") as string || "";
    console.log(cookie)
    if (cookie === "") {
      alert("No cookie signup")
    }
    else {
      try {
        const signup: GoogleSignUpResponse = JSON.parse(cookie);
        if (signup.isSignUp)
          alert("Signup using google OK")
        else
          alert("A user with this email have already exist")
      }
        catch (e) {
          alert("Error signup using goolge. Please try to signup again")
        }
      }
  }

  SignUpFormSubmit() {
    if (this.signUpForm.status == "VALID") {
      const username: string = this.signUpForm.value.username;
      const password: string = this.signUpForm.value.password;
      const email: string = this.signUpForm.value.email;
      const observable: Observable<UsernamePasswordSignUpResponse> = this.signUpService.UsernamePasswordSignUp(username, password, email);
      observable.subscribe({
        next: (response: UsernamePasswordSignUpResponse) => {
          console.log(response)
          console.log("IS SIGN_UP: " + response.isSignUp)
          if (response.isSignUp) {
            alert("Sign-up OK");
            this.storageService.setItem("signup-email", email);
            this.router.navigate(["/check-confirm-email-passcode"])
          }
          else {
            if (response.emailError) {
              alert("Email already exist");
            }
            if (response.usernameError) {
              alert("Username already exist");
            }
          }
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        }
      })
    }
    else {
      alert("Make sure all field is follow requirements");
    }
  }

  SignUpUsingGoogle() {
    let endpoint: string = "/signup/google";
    window.location.href = `${this.serverUrl}${endpoint}`;
  }
}
