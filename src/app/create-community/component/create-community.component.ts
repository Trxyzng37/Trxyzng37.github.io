import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import tinymce from 'tinymce';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { CreateCommunityService } from '../service/create-community/create-community.service';
import { CreateCommunityResponse } from '../pojo/create-community-response';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommunityService } from 'src/app/shared/services/search-communites/community.service';
import { JoinCommunityResponse } from 'src/app/shared/services/search-communites/pojo/join-community-response';

@Component({
  selector: 'create-community',
  templateUrl: './create-community.component.html',
  styleUrl: './create-community.component.scss'
})
export class CreateCommunityComponent {

  public constructor(
    private storageService: StorageService,
    private createCommunityService: CreateCommunityService,
    private communityService: CommunityService,
    private route: Router
  ) {}

  public createCommunityForm: any = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(21), Validators.pattern("^[0-9a-zA-Z ~`!@#$%^&*()_+={[}]|\\:;\"'<,>.?/-]$")])
  })

  @Output() closeFormEvent = new EventEmitter<boolean>();
  public name_status: string = 'INVALID'; 

  public characterCount: number = 0;
  public description: string = "";
  public scope: number = 0;
  public avatar_url: string = "../../../assets/icon/dashed_circle.png";
  public banner_url: string = "../../../assets/banner/default_banner.jpg";
  public allowSubmit: boolean = false;
  public isNameTaken: boolean = false;

  ngOnInit() {
    this.createCommunityForm.get('name').valueChanges.subscribe( () => {
      this.name_status = this.createCommunityForm.get('name').status;
      this.AllowSubmit();
    });
  }

  AllowSubmit() {
    this.allowSubmit = this.name_status == "VALID" && this.description.length >= 0 && 
                       this.avatar_url != "../../../assets/icon/dashed_circle.png" && 
                       this.banner_url != "../../../assets/banner/default_banner.jpg"
    console.log(this.allowSubmit)
  }

  closeForm() {
    this.closeFormEvent.emit(false);
  }

  onInputName() {
    this.isNameTaken = false;
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
    this.description = textareaEle.value;
    this.AllowSubmit();
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
      this.avatar_url = data;
      this.AllowSubmit();
    })
  }

  upLoadBanner(event: any) {
    const files: FileList = event.target.files;
    const file = files[0];
    this.onBannerUpload(file);
  }

  onBannerUpload(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("loadend", () => {
      const data = reader.result as string;
      this.banner_url = data;
      this.AllowSubmit();
    })
  }

  selectScope(scope: number) {
    this.scope = scope;
    this.AllowSubmit();
  }

  submit() {
    const uid = this.storageService.getItem("uid") === "" ? 0 :  Number.parseInt(this.storageService.getItem("uid"));
    this.createCommunityService.createCommunity(uid, this.createCommunityForm.value.name, this.description, this.avatar_url, this.banner_url, this.scope).subscribe({
      next: (response: CreateCommunityResponse) => {
        this.isNameTaken = false;
        Swal.fire('Create community successfully', '', 'success').then((result) => {
          if (result.isConfirmed)
            this.closeForm();
            this.communityService.joinCommunity(uid, response.community_id, 1).subscribe({
              next: (res: JoinCommunityResponse) => {
                setTimeout(() => {
                  window.location.href = "/r/"+response.community_id;
                }, 100)
              }
            })
            
        })
      },
      error: (e: HttpErrorResponse) => {
        if(e.error.error_code == 1) {
          this.isNameTaken = true;
        }
      }
    })
  }
}
