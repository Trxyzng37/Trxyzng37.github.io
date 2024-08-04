import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckPasscodeService } from '../../services/check-passcode/check-passcode.service';
import { DateTimeService } from '../../../shared/services/date-time/date-time.service';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PasscodeResponse } from '../../../shared/pojo/passcode-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pass-code',
  templateUrl: './pass-code.component.html',
  styleUrl: './pass-code.component.scss'
})
export class PassCodeComponent {
  public constructor(
    private checkPasscodeService: CheckPasscodeService,
    private router: Router
  ) {}

  public email: string = sessionStorage.getItem("forgot-password-email") as string || "xxx@xxx";

  public PasscodeForm: any = new FormGroup({
    passcode: new FormControl('', [Validators.pattern("^[0-9]{6}$")])
  })

  onSubmit() {
    if (this.PasscodeForm.status === "VALID") {
      const passcode: number = this.PasscodeForm.value.passcode;
      const observable: Observable<PasscodeResponse> = this.checkPasscodeService.checkPasscode(passcode);
      observable.subscribe({
        next: (response: PasscodeResponse) => {
          if (response.isPasscodeMatch) {
            alert("Passcode OK")
            this.PasscodeForm.reset();
            this.router.navigate(["/change-password"]);
          }
          else {
            alert("Passcode FAIL")
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
}
