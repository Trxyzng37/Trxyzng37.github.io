import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailExistService } from '../../services/email-exist/check-email.service';
import { Observable } from 'rxjs';
import { EmailExistResponse } from '../../pojo/email-exist-response';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../../shared/storage/storage.service';
import Swal from 'sweetalert2';

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

  isLoad: boolean = false;

  ngOnInit(): void {}

  ForgotPasswordFormSubmit() {
    if (this.ForgotPasswordForm.status == "VALID") {
      const email = this.ForgotPasswordForm.value.email;
      this.isLoad = true;
      const observable: Observable<EmailExistResponse> = this.emailExistService.isEmailExist(email);
      observable.subscribe({
        next: (response: EmailExistResponse) => {
          if (response.emailExist && response.googleEmail == false) {
            this.storageService.setItem("forgot-password-email", email)
            this.router.navigate(["/forgot-password-pass-code"]);
          }
          if (response.emailExist && response.googleEmail) {
            Swal.fire("This email sign-up using goole email. Can not change password",'','error');
          }
          if (!response.emailExist) {
            Swal.fire("No user with this email exist",'','warning');
          }
          this.isLoad = false;
        },
        error: (e: HttpErrorResponse) => {
          this.isLoad = false;
          Swal.fire("Error send passcode. Plase try again",'','error');
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        }
      })
    }
    else {
      Swal.fire("Incorrect email address format",'','warning');
    }
  }
}
