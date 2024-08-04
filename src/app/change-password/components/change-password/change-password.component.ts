import { Component, OnInit, booleanAttribute } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SamePasswordValidator } from 'src/app/signup/directives/validators/same-password.directive';
import { ChangePasswordService } from '../../services/change-password.service';
import { EmailExistService } from 'src/app/forgot-password/services/email-exist/check-email.service';
import { Observable } from 'rxjs';
import { ChangePasswordResponse } from '../../pojo/change-password-response';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../../shared/storage/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{
  public constructor (
    private router: Router,
    private changePasswordService: ChangePasswordService,
    private storageService: StorageService
  ) {};

  public ChangePasswordForm: FormGroup = new FormGroup ({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern("^[0-9a-zA-Z ~`!@#$%^&*()_+={[}]|\\:;\"'<,>.?/-]{8,20}$")]),
    reCheck: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern("^[0-9a-zA-Z ~`!@#$%^&*()_+={[}]|\\:;\"'<,>.?/-]{8,20}$")])
  }, {validators: SamePasswordValidator('newPassword', 'reCheck')})

  onSubmit(){
    if (this.ChangePasswordForm.status === "VALID") {
      const password: string = this.ChangePasswordForm.value.newPassword;
      const observable: Observable<ChangePasswordResponse> = this.changePasswordService.changePassword(password);
      observable.subscribe({
        next: (response: ChangePasswordResponse) => {
          if (response.isPasswordChange) {
            alert("Change password successfully")
            this.storageService.removeItem("forgot-password-email");
          }
          if (!response.isPasswordChange) {
            alert("Old and new password can not be the same");
          }
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        }
      })
    }
    else {
      alert("Field value is not the same");
    }
  }

  ngOnInit(): void {}
}
