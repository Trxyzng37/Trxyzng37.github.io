import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CheckUsernameService } from '../service/check-username/check-username.service';
import { UsernameExistResponse } from '../service/check-username/pojo/UsernameExistResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultResponse } from 'src/app/shared/pojo/default-response';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'choose-username',
  templateUrl: './choose-username.component.html',
  styleUrl: './choose-username.component.scss'
})
export class ChooseUsernameComponent {

  constructor(
    private checkUsernameService: CheckUsernameService,
    private storageService: StorageService
  ) {}

  public isUsernameAllow: boolean = false;
  public isUsernameTaken: boolean = true;
  public username: string = "";

  checkUserName(event: any) {
    this.username = event.target.value;
    this.isUsernameAllow = /^[A-Za-z0-9]{3,16}$/.test(this.username);
    if(this.isUsernameAllow) {
      this.checkUsernameService.isUsernameExist(this.username).subscribe({
        next: (response: UsernameExistResponse) => {
            this.isUsernameTaken = response.usernameExist;
        },
        error: (e: HttpErrorResponse) => {
          console.log(e);
          this.isUsernameTaken = true;
        }
      })
    }
  }

  selectUsername() {
    Swal.fire({
      title: "Are you sure",
      icon: "warning",
      html: `<p>Your username is</p><b>${this.username}</b><p>You can not change it</p>`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel"
    }).then((result)=> {
      if(result.isConfirmed) {
        this.checkUsernameService.selectUsername(this.username).subscribe({
          next: (response: DefaultResponse) => {
            if(response.error_code == 0) {
              this.storageService.removeItem("signup_google_email")
              Swal.fire({
                title: "Choose username successfully.",
                icon: 'success'
              }).then(result => {
                if(result.isConfirmed) {
                  window.location.href = "/signin";
                }
              })
            }
          },
          error: (e: HttpErrorResponse) => {
            Swal.fire("Error select username. Please try again",'','error')
          }
        })
      }
    })
  }
}
