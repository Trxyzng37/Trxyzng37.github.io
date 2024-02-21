import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {SignupService} from '../../services/signup/signup.service'
import { SamePasswordValidator } from '../../directives/validators/same-password.directive';
import { ServerUrlService } from 'src/app/shared/services/server-url/server-url.service';
import { IsSignUp } from '../../services/is-signup';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  private serverUrl: string = this.serverUrlService.getUrl();

  ngOnInit(): void {}

  SignUpFormSubmit() {
    if (this.signUpForm.status == "VALID") {
      const username: string = this.signUpForm.value.username;
      const password: string = this.signUpForm.value.password;
      const email: string = this.signUpForm.value.email;
      const observable: Observable<IsSignUp> = this.signUpService.UsernamePasswordSignUp(username, password, email);
      observable.subscribe({
        next: (response: IsSignUp) => {
          console.log(response)
          console.log("IS SING_UP: " + response.isSignUp)
          if (response.isSignUp) {
            alert("Sign-up OK");
            localStorage.setItem("confirm_email", email);
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

  GoogleSignUp() {
    let endpoint: string = "/signin/google-authentication";
    window.location.href = `${this.serverUrl}${endpoint}`;
  }
}