import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTimeService } from '../../../shared/services/date-time/date-time.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PasscodeResponse } from '../../../shared/pojo/passcode-response';
import { ConfirmEmailService } from '../../services/confirm-email/confirm-email.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResendEmailPasscodeResponse } from '../../pojo/resend-email-passcode-response';
import { StorageService } from '../../../shared/storage/storage.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent {
  public constructor(
    private dateTimeService: DateTimeService,
    private router: Router,
    private confirmEmailService: ConfirmEmailService,
    private storageService: StorageService
  ) {}

  public confirmEmailPasscodeForm: any = new FormGroup({
    passcode: new FormControl('', [Validators.pattern("^[0-9]{6}$")])
  })

  public email: string = this.storageService.getItem("email") as string || "xxx@xxx";

  public confirmEmailPasscodeFormSubmit() {
    if (this.confirmEmailPasscodeForm.status === "VALID") {
      const passcode: number = this.confirmEmailPasscodeForm.value.passcode;
      const observable: Observable<PasscodeResponse> = this.confirmEmailService.checkConfirmEmailPasscode(passcode);
      observable.subscribe({
        next: (response: PasscodeResponse) => {
          if (response.isPasscodeExpired) {
            alert("Passcode expired");
          }
          else {
            if (response.isPasscodeMatch) {
              alert("Passcode CORRECT");
              this.storageService.removeItem("signup-email");
              this.router.navigate(["/signup"])
            }
            else 
              alert("Passcode FAIL");
          }
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        }
      })
    }
    else {
      alert("Incorrect passcode format")
    }
  }

  public reSendPasscode() {
    const observable: Observable<ResendEmailPasscodeResponse> = this.confirmEmailService.reSendPasscode(this.email);
    observable.subscribe({
      next: (response: ResendEmailPasscodeResponse) => {
        if (response.createdNewPasscode) {
          alert("Create new passcode OK");
        }
        else {
          alert("Can not create new passcode");
        }
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
      }
    })
  }
}
