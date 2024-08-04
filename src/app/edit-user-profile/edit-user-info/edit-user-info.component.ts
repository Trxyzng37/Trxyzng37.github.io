import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchUserProfileService } from 'src/app/shared/services/search-user-profile/search-user-profile.service';
import { UserProfile } from 'src/app/shared/pojo/pojo/user-profile';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { EditUserInfoService } from '../service/update-user-info/edit-user-info.service';
import { DefaultResponse } from 'src/app/shared/pojo/default-response';
import Swal from 'sweetalert2';
import { DarkModeService } from 'src/app/shared/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrl: './edit-user-info.component.scss'
})
export class EditUserInfoComponent {
  public constructor(
    private searchUserProfileService: SearchUserProfileService,
    private storageService: StorageService,
    private editUserInfoService: EditUserInfoService,
    private darkmodeSerive: DarkModeService
  ) {}

  public userInfo: UserProfile = new UserProfile(0,'','','',0,0,'');
  public isUser: boolean = false;
  public characterCount: number = 0;
  public allowSubmit: boolean = false;

  ngOnInit() {
    this.darkmodeSerive.useDarkMode();
    const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
    const found = window.location.href.match('/setting/([A-Za-z0-9]+)')
    let username = "";
    if(found != null) {
      username = found[1];
    }
    this.searchUserProfileService.getUserProfileByName("/get-user-info-by-username", username).subscribe({
      next: (response: UserProfile) => {
        this.userInfo = response;
        this.isUser = uid === this.userInfo.uid;
        this.characterCount = this.userInfo.description.length;
      }
    })
  }

  onInputDescription(event: any) {
    const textareaEle: any = event.target;
    textareaEle.value = textareaEle.value.replace(/(\r\n|\n|\r)/gm, "");
    textareaEle.style.height = 'auto';
    textareaEle.style.height = `${textareaEle.scrollHeight}px`;
    this.characterCount = textareaEle.value.length;
    if (textareaEle.value === "") {
      textareaEle.style.height = '48px';
      this.characterCount = 0;
    }
    this.userInfo.description = textareaEle.value;
    this.AllowSubmit();
  }

  AllowSubmit() {
    this.allowSubmit = this.userInfo.description.length >= 0 && 
                       this.userInfo.avatar.length != 0
  }

  upLoadImg(event: any) {
    const files: FileList = event.target.files;
    const file = files[0];
    this.onImageUpload(file);
  }

  onImageUpload(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("loadend", () => {
      const data = reader.result as string;
      this.userInfo.avatar = data;
      this.AllowSubmit();
    })
  }

  submit() {
    const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
    this.editUserInfoService.updateUserInfoByUid(uid, this.userInfo.description, this.userInfo.avatar).subscribe({
      next: (response: DefaultResponse) => {
        Swal.fire({
          title: "Edit info successfully",
          icon: 'success'
        })
      }
    })
  }

  cancel() {
    window.history.back();
  }
}
