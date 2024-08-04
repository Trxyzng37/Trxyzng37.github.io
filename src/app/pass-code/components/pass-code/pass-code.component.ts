import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckPasscodeService } from '../../services/check-passcode/check-passcode.service';
import { DateTimeService } from '../../../shared/services/date-time/date-time.service';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PasscodeResponse } from '../../../shared/pojo/passcode-response';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/shared/storage/storage.service';
import Swal from 'sweetalert2';
import { ResendEmailPasscodeResponse } from 'src/app/signup/pojo/resend-email-passcode-response';
import { ConfirmEmailService } from 'src/app/signup/services/confirm-email/confirm-email.service';

@Component({
  selector: 'app-pass-code',
  templateUrl: './pass-code.component.html',
  styleUrl: './pass-code.component.scss'
})
export class PassCodeComponent {
  public constructor(
    private checkPasscodeService: CheckPasscodeService,
    private confirmEmailService: ConfirmEmailService,
    private storageService: StorageService,
    private router: Router
  ) {}

  public email: string = this.storageService.getItem("forgot-password-email");
  public isLoad: boolean = false;
  public resend_count = 0;

  public PasscodeForm: any = new FormGroup({
    passcode: new FormControl('', [Validators.pattern("^[0-9]{6}$")])
  })

  ngOnInit() {
    setInterval(()=> {
      if(this.resend_count <= 0) {
        this.resend_count = 0;
      }
      else {
        this.resend_count--;
      }
    }, 1000)
  }

  onSubmit() {
    if (this.PasscodeForm.status === "VALID") {
      const passcode: number = this.PasscodeForm.value.passcode;
      const observable: Observable<PasscodeResponse> = this.checkPasscodeService.checkPasscode(passcode);
      observable.subscribe({
        next: (response: PasscodeResponse) => {
          if(response.isPasscodeMatch == false) {
            Swal.fire("Incorrect passcode",'','warning')
          }
          if(response.isPasscodeExpired == false) {
            Swal.fire("Passcode expired",'','warning')
          }
          else if (response.isPasscodeMatch) {
            this.PasscodeForm.reset();
            this.storageService.setItem("change-password", "true");
            this.router.navigate(["/change-password"]);
          }
          else {
            Swal.fire("Incorrect passcode",'','warning')
          }
        },
        error: (e: HttpErrorResponse) => {
          Swal.fire("Error checking passcode. Please try again",'','error')
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        }
      })
    }
  }

  public reSendPasscode() {
    this.resend_count = 60;
    this.isLoad = true;
    const observable: Observable<ResendEmailPasscodeResponse> = this.confirmEmailService.reSendPasscode("/resend-change-password-passcode", this.email);
    observable.subscribe({
      next: (response: ResendEmailPasscodeResponse) => {
        if (response.createdNewPasscode) {
          this.isLoad = false;
          Swal.fire("New Passcode has been sent to your email",'','success');
        }
        else {
          this.isLoad = false;
          Swal.fire("Error create new passcode. Please try again",'','error');
        }
      },
      error: (e: HttpErrorResponse) => {
        this.isLoad = false;
        Swal.fire("Error create new passcode. Please try again",'','error');
      }
    })
  }
}
