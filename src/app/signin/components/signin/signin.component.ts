import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UsernamePasswordService } from '../../services/username-password/username-password.service';
import { ServerUrlService } from '../../../shared/services/server-url/server-url.service';
import { getCookie } from 'typescript-cookie';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleSignInResponse } from '../../pojo/google-signin-response';
import { UsernamePasswordSignInResponse } from '../../pojo/username-password-signin-response';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  constructor ( 
    private usernamePasswordService: UsernamePasswordService, 
    private serverUrlService: ServerUrlService,
    private router: Router,
    private storageService: StorageService
  ) {}

  private serverUrl: string = this.serverUrlService.getUrl();
  public signInForm: any = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("^[0-9a-zA-Z]{2,16}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern("^[0-9a-zA-Z ~`!@#$%^&*()_+={[}]|\\:;\"'<,>.?/-]{8,20}$")])
  })

  //when component first init
  ngOnInit(): void {
    const cookie: string = getCookie("GoogleSignIn") as string || "";
    if (cookie === "")  
      alert("No cookie signin")
    else {
      try {
        const signin: GoogleSignInResponse = JSON.parse(cookie);
        if (signin.isGoogleSignIn)
          alert("signin using google OK")
        else
          alert("signin using google FAIL")
      }
        catch (e) {
          alert("Error signin using goolge. Please try signin again")
        }
      }
    }

  //google login
  SignInUsingGoogle() {
    let endpoint: string = "/signin/google";
    window.location.href = `${this.serverUrl}${endpoint}`;
  }

  //when username-password form is submitted
  SignInFormSubmit() {
    if (this.signInForm.status == "VALID") {
      const username: string = this.signInForm.value.username;
      const password: string = this.signInForm.value.password;
      const observable: Observable<UsernamePasswordSignInResponse> = this.usernamePasswordService.signinByUsernamePassword(username, password);
      observable.subscribe({
        next: (response: UsernamePasswordSignInResponse) => {
          if (response.isSignIn) {
            alert("login ok using username-password");
            this.storageService.setItem("isSignIn", "true");
          }
          if (response.passwordError) {
            alert("Wrong password for user");
          }
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        }
      })
    }
  }
}

