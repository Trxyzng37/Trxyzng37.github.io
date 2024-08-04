import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';
import { DateTimeService } from 'src/app/shared/services/date-time/date-time.service';
import { GetPostService } from 'src/app/view-detail-post/view-detail-post/service/get-post/get-post.service';
import Swal from 'sweetalert2';
import tinymce from 'tinymce';
import { EditPostService } from '../../service/edit-post/edit-editor-post.service';
import { EditPostResponse } from '../../pojo/edit-post-response';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'app-edit-editor-post',
  templateUrl: './edit-editor-post.component.html',
  styleUrl: './edit-editor-post.component.scss'
})
export class EditEditorPostComponent {

  public constructor(
    private getPostService: GetPostService,
    private activeRoute: ActivatedRoute,
    private dateTimeService: DateTimeService,
    private editPostService: EditPostService,
    private storageService: StorageService,
    private route: Router
  ) {}

  public post_id: number = 0;
  public shownDate: string = "";
  public postData: GetPostResponse = new GetPostResponse(0,"",0,"","",0,"","","","","",0,0,0);
  public edit_title: string = "";
  public edit_content: string = "";
  public characterCount: number = 0;
  public original_title: string = "";
  public original_content: string = "";
  public allowSubmit: boolean = false;
  public isLoad: boolean = false;

  ngOnInit() {
    const title = (<HTMLInputElement>document.getElementById("input_post_title"));
    this.shownDate = this.dateTimeService.getTimeByCompareCreatedAtAndCurrentDate(this.postData.created_at);
    this.post_id = this.activeRoute.snapshot.params['post_id'];
    this.getPostService.getPostByPostId(this.post_id).subscribe({
      next: (response: GetPostResponse) => {
        this.postData = response;
        title.value = this.postData.title;
        this.edit_title = this.postData.title;
        this.edit_content = this.postData.content;
        this.characterCount = this.postData.title.length;
        this.original_title = this.postData.title;
        this.original_content = this.postData.content;
        tinymce.activeEditor?.setContent(this.postData.content);
        this.AllowSubmit();
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
      }
    })
  }

  AllowSubmit() {
    this.allowSubmit = (this.original_title !== this.edit_title || this.original_content !== this.edit_content) &&
                       this.edit_title.length !== 0
                       ? false : true;
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

  public editorSettings = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'link lists codesample image autoresize', 
    toolbar: "bold italic underline strikethrough forecolor subscript superscript removeformat numlist bullist link blockquote codesample image",
    toolbar_mode: 'wrap',
    placeholder: '(Optional)',
    automatic_uploads: true,
    file_picker_types: 'image',
    images_file_types: 'jpg,svg,webp,png,jpeg',
    images_reuse_filename: true,
    image_dimensions: false,
    image_caption: true,
    image_description: false,
    statusbar: true,
    elementpath: false,
    branding: false,
    resize: true,
    width: '100%',
    min_height: 100,
    // max_height:1000,
    autoresize_min_height: 200,
    // autoresize_max_height: 300,
    // height: '100px', 
    menubar: false, 
    draggable_modal: false,
    object_resizing: false,
    inline_boundaries: false,
    contenteditable: false,
    paste_data_images: false,
    paste_block_drop: false,
    color_default_foreground: '#E03E2D',
    color_default_background: '#000000',
    color_map_background: [
      '000000', 'Black'
    ],
    textcolor_map: ['#E03E2D', 'Red'],
    custom_colors: false,
    content_css: 'tinymce-5',
    content_style: 
      'p { margin: 0; } ' + 
      'img { display: block; margin: 0 auto; out-line: 0; max-width: 100%; max-height: 100%}' +
      'body {line-height: normal}' +
      'pre[class*=language-] {font-family: Consolas}',
    file_picker_callback: (cb: any, value:any, meta:any) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.addEventListener('change', (e:any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const id = file.name;
          const blobCache =  tinymce.activeEditor!.editorUpload.blobCache;
          const base64 = (<string>reader.result).split(',')[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
          cb(blobInfo.blobUri(), { title: file.name });
        });
        reader.readAsDataURL(file);
      })
      input.click();
    },
  }

  count=0;
  setContent(event: any) {
    if(this.count == 0) {
      this.count++;
      tinymce.activeEditor?.setContent(this.postData.content);
      this.AllowSubmit();
    }
    this.count++;
    this.edit_content = event.editor.getContent({ format: 'html' });
    this.AllowSubmit();
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
        this.editPostService.editPost("/edit-editor-post", "editor", this.post_id, uid, this.edit_title, this.edit_content).subscribe({
        next: (response: EditPostResponse) => {
          if (result.isConfirmed) {
            this.isLoad = false;
            Swal.fire('Edit post successfully', '', 'success').then((result)=>{
              if(result.isConfirmed)
                this.route.navigate(["/post/"+this.post_id]);
            });
          } 
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
