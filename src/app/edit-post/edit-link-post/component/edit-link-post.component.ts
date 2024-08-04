import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPostService } from 'src/app/view-detail-post/view-detail-post/service/get-post/get-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPostService } from '../../service/edit-post/edit-editor-post.service';
import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';
import { HttpErrorResponse } from '@angular/common/http';
import { OpenGraphResponse } from 'src/app/post-link/link-review/pojo/open-graph-response';
import Swal from 'sweetalert2';
import { EditPostResponse } from '../../pojo/edit-post-response';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'app-edit-link-post',
  templateUrl: './edit-link-post.component.html',
  styleUrl: './edit-link-post.component.scss'
})
export class EditLinkPostComponent {

  public constructor(
    private getPostService: GetPostService,
    private activeRoute: ActivatedRoute,
    private editPostService: EditPostService,
    private storageService: StorageService,
    private route: Router
  ) {}
  
  public post_id: number = 0;

  public edit_title: string = "";
  public edit_content: string = "";
  public characterCount: number = 0;
  public original_title: string = "";
  public original_content: string = "";
  public data!: OpenGraphResponse;
  public allowSubmit: boolean = false;
  public isLoad: boolean = false;

  ngOnInit() {
    const title = (<HTMLInputElement>document.getElementById("input_post_title"));
    this.post_id = this.activeRoute.snapshot.params['post_id'];
    this.getPostService.getPostByPostId(this.post_id).subscribe({
      next: (response: GetPostResponse) => {
        this.data = JSON.parse(response.content);
        this.original_title = response.title;
        this.original_content = this.data.link;
        this.edit_title = response.title;
        this.edit_content = this.data.link;
        this.characterCount = response.title.length;
        this.AllowSubmit();
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
    this.allowSubmit = (this.original_title !== this.edit_title || this.original_content !== this.edit_content) &&
                       this.edit_title.length !== 0 &&
                       this.edit_content.length !== 0
                       ? false : true;
  }

  inputLink(event: any) {
    const textareaEle: any = event.target;
    textareaEle.value = textareaEle.value.replace(/(\r\n|\n|\r)/gm, "");
    textareaEle.value = textareaEle.value.replace(" ", "");
    textareaEle.style.height = 'auto';
    textareaEle.style.height = `${textareaEle.scrollHeight}px`;
    if (textareaEle.value === "") {
      textareaEle.style.height = '40px';
    }
    this.edit_content = textareaEle.value;
    this.AllowSubmit();
    this.isValidHttpUrl(textareaEle.value);
  }

  isValidHttpUrl(url: string) {
    try {
      const obj = new URL(url);
      this.allowSubmit = obj.protocol === "http:" || obj.protocol === "https:" ? false: true;
      console.log(obj.protocol)
    } 
    catch (_) {
      this.allowSubmit = true;  
    }
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
        if (result.isConfirmed) {
          this.isLoad = true;
          const uid: number = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
          this.editPostService.editPost("/edit-link-post", "link", this.post_id, uid, this.edit_title, this.edit_content).subscribe({
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
