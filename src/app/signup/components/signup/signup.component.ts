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
import Swal from 'sweetalert2';
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
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[`~!@#$%^&*()_\\-+=\\[\\]{};:'\",.<>?/\\\\|])[A-Za-z\\d`~!@#$%^&*()_\\-+=\\[\\]{};:'\",.<>?/\\\\|]{8,20}$")]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), 
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[`~!@#$%^&*()_\\-+=\\[\\]{};:'\",.<>?/\\\\|])[A-Za-z\\d`~!@#$%^&*()_\\-+=\\[\\]{};:'\",.<>?/\\\\|]{8,20}$")])
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
  public isLoad: boolean = false;

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
    if (cookie === "") {
    }
    else {
      try {
        const signup: GoogleSignUpResponse = JSON.parse(cookie);
        if (signup.isSignUp) {
          Swal.fire('Sign up using google successfully','','success').then(result => {
            if(result.isConfirmed) {
              this.storageService.setItem("signup_google_email", getCookie("signup_google_email")!);
              window.location.href = "/choose-username";
            }
          })

        }
        else
          Swal.fire('A user with this email has already exist. \nPlease use a different email','','error')
      }
        catch (e) {
          Swal.fire("Error signup using goolge. Please try to sign-up again",'','error')
        }
      }
  }

  SignUpFormSubmit() {
    if (this.signUpForm.status == "VALID") {
      const username: string = this.signUpForm.value.username;
      const password: string = this.signUpForm.value.password;
      const email: string = this.signUpForm.value.email;
      this.isLoad = true;
      const observable: Observable<UsernamePasswordSignUpResponse> = this.signUpService.UsernamePasswordSignUp(username, password, email);
      observable.subscribe({
        next: (response: UsernamePasswordSignUpResponse) => {
          if (response.isSignUp) {
            // Swal.fire({
            //   text: 'Sign up successfully',
            //   icon: 'success'
            // }).then((result)=>{
            //   if(result.isConfirmed) {
            //     this.storageService.setItem("signup-email", email);
            //     this.router.navigate(["/check-confirm-email-passcode"])
            //   }
            // })
            this.storageService.setItem("signup-email", email);
            this.router.navigate(["/check-sign-up-passcode"])
          }
          else {
            if (response.emailError == 1) {
              Swal.fire({
                icon: "warning",
                title: "An account with this email has already exist",
              })
            }
            if (response.usernameError == 1) {
              Swal.fire("Username already exist",'','warning')
            }
          }
          this.isLoad = false;
        },
        error: (e: HttpErrorResponse) => {
          Swal.fire("Error sign up. Please try again",'','error');
          this.isLoad = false;
        }
      })
    }
  }

  SignUpUsingGoogle() {
    let endpoint: string = "/signup/google";
    window.location.href = `${this.serverUrl}${endpoint}`;
  }
}
