import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailExistService } from '../../services/email-exist/check-email.service';
import { Observable } from 'rxjs';
import { EmailExistResponse } from '../../pojo/email-exist-response';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../../shared/storage/storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  public constructor (
    private router: Router,
    private emailExistService: EmailExistService,
    private storageService: StorageService
  ) {};

  public ForgotPasswordForm: any = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  ngOnInit(): void {}

  ForgotPasswordFormSubmit() {
    if (this.ForgotPasswordForm.status == "VALID") {
      const email = this.ForgotPasswordForm.value.email;
      const observable: Observable<EmailExistResponse> = this.emailExistService.isEmailExist(email);
      observable.subscribe({
        next: (response: EmailExistResponse) => {
          if (response.emailExist) {
            this.storageService.setItem("forgot-password-email", email)
            this.router.navigate(["/pass-code"]);
          }
          else 
            alert("No user with this email address");
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        }
      })
    }
    else {
      alert("Incorrect email address format")
    }
  }
}
