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
import Swal from 'sweetalert2';

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

  // public ChangePasswordForm: any = new FormGroup ({
  //   newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  //   reCheck: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  // }, {validators: SamePasswordValidator('newPassword', 'reCheck')})

  public password_status: boolean = false;
  public password: string = "";
  public re_enter_password: string = "";
  public allowSubmit: boolean = false;

  ngOnInit() {}

  inputPassword(event: any) {
    const input_value: string = event.target.value;
    this.password = input_value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_\-+=\[\]{};:'",.<>?\/\\|])[A-Za-z\d!`~@#$%^&*()_\-+=\[\]{};:'",.<>?\/\\|]{8,20}$/;
    console.log(this.password)
    this.password_status = regex.test(input_value);
    console.log(this.password_status)
    this.canSubmit();
  }

  inputRecheck(event: any) {
    const input_value: string = event.target.value;
    this.re_enter_password = input_value;
    this.canSubmit();
  }

  canSubmit() {
    this.allowSubmit = this.re_enter_password == this.password;
  }

  onSubmit(){
    if (this.allowSubmit) {
      const email: string = this.storageService.getItem("forgot-password-email");
      if (email === "")
        Swal.fire("Error changing password. Please try again",'','error');
      else {
        const observable: Observable<ChangePasswordResponse> = this.changePasswordService.changePassword(email, this.password);
        observable.subscribe({
          next: (response: ChangePasswordResponse) => {
            if (response.isPasswordChange) {
              Swal.fire("Change password successfully",'','success').then(result=>{
                if(result.isConfirmed) {
                  this.storageService.removeItem("forgot-password-email");
                  this.storageService.removeItem("change-password");
                  this.router.navigate(['/signin'])
                }
              })
            }
            if (!response.isPasswordChange) {
              Swal.fire("Old and new password can not be the same",'','warning');
            }
          },
          error: (e: HttpErrorResponse) => {
            Swal.fire("Error changing password. Please try again",'','error');
            console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
          }
        })
      }
    }
    else {
      Swal.fire("Field value is not the same",'','warning');
    }
  }
}
