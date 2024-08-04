import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Img } from 'src/app/create-post/pojo/img';
import { GetPostService } from 'src/app/view-detail-post/view-detail-post/service/get-post/get-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';
import { HttpErrorResponse } from '@angular/common/http';
import { EditPostService } from '../../service/edit-post/edit-editor-post.service';
import Swal from 'sweetalert2';
import { EditPostResponse } from '../../pojo/edit-post-response';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'app-edit-img-post',
  templateUrl: './edit-img-post.component.html',
  styleUrl: './edit-img-post.component.scss'
})
export class EditImgPostComponent {

  public constructor(
    private getPostService: GetPostService,
    private activeRoute: ActivatedRoute,
    private editPostService: EditPostService,
    private storageService: StorageService,
    private route: Router
  ) {}

  public post_id: number = 0;
  public imgArr: Img[] = [];
  img: Img = new Img("");
  selected_id: number = 0;
  public isImgUpload: boolean = true;
  public allowSubmit: boolean = true;
  public characterCount: number = 0;
  public edit_title: string = "";
  public edit_content: string = "";
  public original_title: string = "";
  public original_content: string = "";
  public isLoad: boolean = false;

  ngOnInit() {
    const title = (<HTMLInputElement>document.getElementById("input_post_title"));
    this.post_id = this.activeRoute.snapshot.params['post_id'];
    this.getPostService.getPostByPostId(this.post_id).subscribe({
      next: (response: GetPostResponse) => {
        this.imgArr = JSON.parse(response.content);
        this.img = this.imgArr[this.imgArr.length-1];
        this.selected_id = this.imgArr.length-1;
        title.value = response.title;
        this.edit_title = response.title;
        this.characterCount = response.title.length;
        this.original_title = response.title;
        this.original_content = response.content;
        this.AllowSubmit()
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
      }
    })
  }

  inputTitle(event: any) {
    const textareaEle: any = event.target;
    textareaEle.value = textareaEle.value.replace(/(\r\n|\n|\r)/gm, "");
    textareaEle.style.height = 'auto';
    textareaEle.style.height = `${textareaEle.scrollHeight}px`;
    this.characterCount = textareaEle.value.length;
    if (textareaEle.value === "") {
      textareaEle.style.height = '30px';
      this.characterCount = 0;
    }
    this.edit_title = textareaEle.value;
    this.AllowSubmit();
  }

  AllowSubmit() {
    this.edit_content = JSON.stringify(this.imgArr);
    this.allowSubmit = (this.original_title != this.edit_title || this.original_content != this.edit_content) &&
                       this.edit_title.length > 0 &&
                       this.imgArr.length > 0
                       ? false : true;
  }

  onDrop(event: any) {
    event.preventDefault();   
    event.stopPropagation();
    const dt = event.dataTransfer;
    const files:File[] = dt.files;
    for(let i=0; i< files.length; i++) {
      this.onImageUpload(files[i]);
    }
    const post_img_block: any = document.getElementById("post_img_block");
    post_img_block.style.border = "none";
    this.AllowSubmit();
  }

  onDragEnter(event: Event) {
    console.log("drag")
    event.preventDefault();
    event.stopPropagation();
    const post_img_block: any = document.getElementById("post_img_block");
    post_img_block.style.border = "2px dashed black";
  }

  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation()
    const parent: any = document.getElementById("post_img_block");
    parent.style.border = "none";
  }

  upLoadImg(event: any) {
    const files: FileList = event.target.files;
    const file = files[0];
    this.selected_id = 0;
    this.onImageUpload(file);
  }

  onImageUpload(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("loadend", () => {
      const data = reader.result as string;
      const path = (window.URL || window.webkitURL).createObjectURL(file);
      const img = new Img(data);
      console.log(img)
      this.imgArr.push(img);
      this.isImgUpload = this.imgArr.length <= 1 ? false : true;
      this.img = img;
      const arr_length = this.imgArr.length;
      this.selected_id = this.imgArr.length === 1 ? -1 : arr_length - 1;
      this.AllowSubmit();
    })
    this.AllowSubmit();
  }

  deleteImg(id: number) {
    this.imgArr.splice(id, 1);
    if (id === 0 && this.imgArr.length === 0) {
      this.img = new Img("");
      this.selected_id = -1;
      this.imgArr = [];
      this.isImgUpload = false;
    }
    else if (id <= 1 && this.imgArr.length === 1) {
      this.img = new Img("");
      this.selected_id = -1;
      this.isImgUpload = false;
    }
    else if (id === 0 && this.imgArr.length > 1) {
      this.img = this.imgArr[id];
      this.selected_id = id;
    }
    else {
      this.img = this.imgArr[id-1];
      this.selected_id = id-1;
    }
    this.AllowSubmit();
  }

  selectImg(id: number) {
    this.img = this.imgArr[id];
    this.selected_id = id;
  }

  onInputChange(img: Img) {
    this.imgArr[this.selected_id] = img;
    this.AllowSubmit()
  }

  editPost() {
    Swal.fire({
      titleText: "Are you sure you want to edit this post",
      icon: "warning",
      heightAuto: true,
      showCancelButton: true,
      showConfirmButton: true,
      focusCancel: false,
      focusConfirm: false,
      }).then((result) => {
        this.edit_content = JSON.stringify(this.imgArr);
        console.log(this.edit_content);
        // console.log("load")
        if (result.isConfirmed) {
          this.isLoad = true;
          const uid: number = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
          this.editPostService.editPost("/edit-img-post", "img", this.post_id, uid, this.edit_title, this.edit_content).subscribe({
            next: (response: EditPostResponse) => {
              this.isLoad = false;
              Swal.fire('Edit post successfully', '', 'success').then((result)=>{
                if(result.isConfirmed)
                  this.route.navigate(["/post/"+this.post_id]);
              });
            },
            error: (e: HttpErrorResponse) => {
              this.isLoad = false;
              Swal.fire('Fail to edit post. Please try again', '', 'error')
            }
          })
        }
      })
  }

  cancelEdit() {
    Swal.fire({
      titleText: "Cancel edit post",
      text: "The new content will not be saved",
      icon: "warning",
      heightAuto: true,
      showCancelButton: true,
      showConfirmButton: true,
      focusCancel: false,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) 
        this.route.navigate(["/post/"+this.post_id]);
    })
  }
}
