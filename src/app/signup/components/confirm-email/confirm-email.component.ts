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
import Swal from 'sweetalert2';

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

  public isLoad: boolean = false;
  public resend_count = 0;

  public confirmEmailPasscodeForm: any = new FormGroup({
    passcode: new FormControl('', [Validators.pattern("^[0-9]{6}$")])
  })

  public email: string = this.storageService.getItem("signup-email") as string || "xxx@xxx";

  ngOnInit() {
    setInterval(() => {
      if(this.resend_count <= 0) {
        this.resend_count = 0;
      }
      else {
        this.resend_count--;
      }
    }, 1000);
  }

  public confirmEmailPasscodeFormSubmit() {
    if (this.confirmEmailPasscodeForm.status === "VALID") {
      const passcode: number = this.confirmEmailPasscodeForm.value.passcode;
      const observable: Observable<PasscodeResponse> = this.confirmEmailService.checkConfirmEmailPasscode(passcode);
      observable.subscribe({
        next: (response: PasscodeResponse) => {
          if (response.isPasscodeExpired) {
            Swal.fire("Passcode has expired",'','warning')
          }
          else {
            if (response.isPasscodeMatch) {
              Swal.fire({
                text: 'Passcode is correct. \nSign up successfully',
                icon: 'success'
              }).then((result)=>{
                this.storageService.removeItem("signup-email");
                this.router.navigate(["/signin"])
              })
            }
            else {
              Swal.fire("Passcode does not match",'','warning')
            }
          }
        },
        error: (e: HttpErrorResponse) => {
          Swal.fire("An unknown error has happen. Please try to sign-up again",'','error')
        }
      })
    }
  }

  public reSendPasscode() {
    this.resend_count = 60;
    this.isLoad = true;
    const observable: Observable<ResendEmailPasscodeResponse> = this.confirmEmailService.reSendPasscode("/resend-confirm-email-passcode", this.email);
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
