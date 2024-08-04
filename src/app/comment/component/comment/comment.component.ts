import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VotePostService } from 'src/app/post-link/post-link/service/vote-post/vote-post.service';
import { DateTimeService } from 'src/app/shared/services/date-time/date-time.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { Comment } from 'src/app/view-detail-post/view-detail-post/pojo/comment';
import { CreateCommentResponse } from 'src/app/view-detail-post/view-detail-post/pojo/create-comment-response';
import { CreateCommentService } from 'src/app/view-detail-post/view-detail-post/service/create-comment/create-comment.service';
import tinymce from 'tinymce';
import { VoteCommentService } from '../../service/vote-comment/vote-comment.service';
import { VoteCommentResponse } from '../../pojo/vote-comment-response';
import { GetCommentStatusService } from '../../service/get-comment-status/get-comment-status.service';
import { CommentStatusResponse } from '../../pojo/comment-status-response';
import { EditCommentService } from '../../service/edit-comment/edit-comment.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { DeleteCommentService } from '../../service/delete-comment/delete-comment.service';
import { DeleteCommentResponse } from '../../pojo/delete-comment-response';
import { PresentationService } from 'src/app/shared/services/presentation/presentation.service';
import { VoteImgService } from 'src/app/shared/services/vote-img/vote-img.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  public constructor(
    public sanitizer: DomSanitizer,
    private voteCommentService: VoteCommentService,
    private storageService: StorageService,
    private dateTimeService: DateTimeService,
    private createCommentService: CreateCommentService,
    private getCommentStatusService: GetCommentStatusService,
    private editCommentService: EditCommentService,
    private deleteCommentService: DeleteCommentService,
    public presentationService: PresentationService,
    public voteImgService: VoteImgService
  ) {}


  @Input() commentData: Comment = new Comment(0,0,0,'','',0,'',0,'',0,false);
  @Input() postId: number = 0;
  @Input() isCommunityOwner: boolean = false;
  @Output() commentModified = new EventEmitter<boolean>();

  public isShown: boolean = true;
  public isDeleted: boolean = false;
  public isReplyAllowed: boolean = false;
  public isEditAllowed: boolean = false;
  public isDeleteAllowed: boolean = false;
  public isEditorShow: boolean = false;
  public isOptionShow: boolean = false;
  public isUserComment: boolean = false;
  public isUserPage: boolean = false;

  public replyCommentData: string = "";
  public editCommentData: string = "";


  public voteType: string = 'none'; //none upvote downvote
  public previousVote: number = 0;
  public shownDate: string = "";
  public margin: string = "0px";
  public previousContent = "";
  public uid: number = 0;

  public editor_id: string = "";

  public  upvote = "../../../../../assets/icon/upvote.png"
  public  upvote_fill = "../../../../../assets/icon/upvote-comment-fill.png"
  public  downvote = "../../../../../assets/icon/downvote.png"
  public  downvote_fill = "../../../../../assets/icon/downvote-comment-fill.png"
  
  ngOnInit() {
    this.voteImgService.selectDownVoteImg();
    this.voteImgService.selectUpVoteImg();
    this.commentData.content = this.commentData.content.replace("<img src=", "<img class='img_comment' src=");
    this.isDeleted = this.commentData.deleted;
    this.isUserPage = window.location.href.includes("/user/");
    this.uid = this.storageService.getItem("uid") === "" ? 0 : Number(this.storageService.getItem("uid"));
    this.isUserComment = this.commentData.uid == this.uid ? true : false;
    this.isEditAllowed = this.commentData.uid == this.uid ? true : false;
    this.isDeleteAllowed = this.commentData.uid == this.uid ? true : false;
    this.isReplyAllowed = this.commentData.uid != this.uid ? true : false;
    this.shownDate = this.dateTimeService.getTimeByCompareCreatedAtAndCurrentDate(this.commentData.created_at);
    // this.margin = this.commentData.level*30 + "px";
    this.commentData.content = this.commentData.content.replace(/<img/g, '<img style="display:block;" ');
    this.commentData.content = this.commentData.content.replace(/<ol/g, '<ol style="margin-left:20px;" ');
    this.commentData.content = this.commentData.content.replace(/<ul/g, '<ul style="margin-left:30px;" ');
    this.commentData.content = this.commentData.content.replace(/<pre/g, '<pre class="pre_code" style="width:fit-content" ');
    this.commentData.content = this.commentData.content.replace(/<code/g, '<code class="code" ');
    this.commentData.content = this.commentData.content.replace(/<a/g, '<a class="a link" ');
    this.previousContent = this.commentData.content;
    this.editCommentData = this.commentData.content;
    this.getCommentStatusService.getCommentStatus(this.commentData._id, this.uid).subscribe({
      next: (response: CommentStatusResponse) => {
        this.voteType = response.vote_type;
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        console.log("Error check comment status");
      }
    })
    // document.getElementById("editor")?.setAttribute("id", this.commentData._id.toString());
  }

  showComment(event: Event) {
    this.isShown = !this.isShown;
  }

  voteComment(event: Event, type: string) {
    event.stopPropagation();
    this.uid = this.storageService.getItem("uid") === "" ? 0 : Number(this.storageService.getItem("uid"));
    if(this.uid === 0) {
      Swal.fire({
        title: "You need to sign-in to do this action",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK",
        footer: '<a href="signin" style="color:red;font-size: 18px"><b>Click here to go to sign-in page<b/></a>'
      })
    }
    else {
      if (this.voteType === 'none' && type === 'upvote') {
        this.previousVote = this.commentData.vote;
        this.commentData.vote += 1;
        this.voteType = 'upvote';
      }
      else if (this.voteType === 'none' && type === 'downvote') {
        this.previousVote = this.commentData.vote;
        this.commentData.vote -= 1;
        this.voteType = 'downvote';
      }
      else if (this.voteType === 'upvote' && type === 'upvote') {
        this.previousVote = this.commentData.vote;
        this.commentData.vote -= 1;
        this.voteType = 'none';
      }
      else if (this.voteType === 'upvote' && type === 'downvote') {
        this.previousVote = this.commentData.vote;
        this.commentData.vote -= 2;
        this.voteType = 'downvote';
      }
      else if (this.voteType === 'downvote' && type === 'upvote') {
        this.previousVote = this.commentData.vote;
        this.commentData.vote += 2;
        this.voteType = 'upvote';
      }
      else if (this.voteType === 'downvote' && type === 'downvote') {
        this.previousVote = this.commentData.vote;
        this.commentData.vote += 1;
        this.voteType = 'none';
      }
      this.sendVoteCommentToServer();
    }
  }

  sendVoteCommentToServer() {
    const username: string = this.storageService.getItem("username");
    this.voteCommentService.updateVoteComment(this.postId, this.commentData._id, this.commentData.vote, this.voteType).subscribe({
      next: (response: VoteCommentResponse) => {
        console.log("Vote comment: "+response.vote_updated);
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        this.commentData.vote = this.previousVote;
        this.voteType = 'none';
        console.log("Error vote post");
        console.log("vote when error: "+this.commentData.vote);
      }
    })
  }

  reply() {
    this.uid = this.storageService.getItem("uid") === "" ? 0 : Number(this.storageService.getItem("uid"));
    if(this.uid === 0) {
      Swal.fire({
        title: "You need to sign-in to do this action",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK",
        footer: '<a href="signin" style="color:red;font-size: 18px"><b>Click here to go to sign-in page<b/></a>'
      })
    }
    else {
      this.isEditorShow = !this.isEditorShow;
    }
  }

  img_count = 0;
  public editorSettings = {
    selector: "editor",
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'link lists codesample image autoresize', 
    toolbar: "bold italic underline strikethrough forecolor subscript superscript removeformat numlist bullist link blockquote codesample image",
    toolbar_mode: 'wrap',
    placeholder: 'Enter your comment',
    automatic_uploads: true,
    file_picker_types: 'image',
    images_file_types: 'jpg,svg,webp,png,jpeg',
    images_reuse_filename: true,
    image_dimensions: false,
    // image_caption: true,
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
    cleanup : false,
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
      'img { display: block; out-line: 0; max-width: 200px; max-height: 200px}' +
      'body {line-height: normal}' +
      'pre[class*=language-] {font-family: Consolas}',
    file_picker_callback: (cb: any, value:any, meta:any) => {
      if(this.img_count == 0) {
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
        this.img_count++;
      }
      else {
        Swal.fire("Only 1 image is allow in a comment",'','warning');
      }
    },
    init_instance_callback: (editor: any) => {
      this.editor_id = editor.id;
    }
  }

  onContentChanged(event: any) {
    this.count++;
    // console.log("count: "+this.count)
    if (this.isEditAllowed && this.count > 1) {
      this.editCommentData = tinymce.EditorManager.get(this.editor_id)!.getContent({ format: 'html' });
      // console.log("edit content: "+this.editCommentData)
    }
    if (this.isReplyAllowed) {
      this.replyCommentData = event.editor.getContent({ format: 'html' });
      // console.log("reply content: "+this.replyCommentData)
    }
  }

  cancelComment() {
    if(this.replyCommentData != "" || this.editCommentData != "") {
        Swal.fire({
          titleText: "Do you want to clear this comment",
          icon: "warning",
          heightAuto: true,
          showCancelButton: true,
          showConfirmButton: true,
          focusCancel: false,
          focusConfirm: false
        }).then((result) => {
          if (result.isConfirmed) {
            // Swal.fire('Clear comment successfully', '', 'success')
            this.replyCommentData = "";
            tinymce.activeEditor?.setContent(this.replyCommentData);
            this.isEditorShow = !this.isEditorShow;
            this.count = 0;
            this.editCommentData = this.commentData.content;
          } 
          if (result.isDismissed) {
          }
        })
      }
  }

  createComment() {
    this.uid = this.storageService.getItem("uid") === "" ? 0 : Number(this.storageService.getItem("uid"));
    if(this.uid == 0) {
      Swal.fire({
        title: "You need to sign-in to do this action",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK",
        footer: '<a href="signin" style="color:red;font-size: 18px"><b>Click here to go to sign-in page<b/></a>'
      })
    }
    else {
      this.createCommentService.createComment(this.postId, this.commentData._id, this.replyCommentData, this.commentData.level+1).subscribe({
        next: (response: CreateCommentResponse) => {
          this.commentModified.emit(true);
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
          Swal.fire({
            titleText: "Error create comment. Please try again",
            icon: "success",
            heightAuto: true,
            showConfirmButton: true,
            focusCancel: false,
            focusConfirm: false
          })
        }
      })
    }
  }

  public count = 0;
  showEditComment() {
    this.isEditorShow = !this.isEditorShow;
    if(this.count < 2)
      tinymce.EditorManager.get(this.editor_id)?.setContent(this.editCommentData);
    this.count++;
    // console.log("count: "+this.count)
    // console.log("editCommentData: "+this.editCommentData)
  }

  sendEditComment() {
    this.uid = this.storageService.getItem("uid") === "" ? 0 : Number(this.storageService.getItem("uid"));
    if(this.uid == 0) {
      Swal.fire({
        title: "You need to sign-in to do this action",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK",
        footer: '<a href="signin" style="color:red;font-size: 18px"><b>Click here to go to sign-in page<b/></a>'
      })
    }
    else {
      if(this.commentData.content != this.editCommentData && this.editCommentData != "") {
        this.editCommentService.editComment(this.postId, this.commentData._id, this.editCommentData).subscribe({
          next: (response: Comment) => {
            this.commentData.content = response.content;
            this.previousContent = response.content;
            this.isEditorShow = !this.isEditorShow;
          },
          error: (e: HttpErrorResponse) => {
            console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
            if(this.uid == 0) {
              Swal.fire({
                titleText: "Error edit comment. Please try again",
                icon: "error",
                heightAuto: true,
                showConfirmButton: true,
                focusCancel: false,
                focusConfirm: false
              })
            }
          }
        })
      }
      else {
        Swal.fire({
          titleText: "Please edit your comment",
          icon: "info",
          heightAuto: true,
          showConfirmButton: true,
          focusCancel: false,
          focusConfirm: false
        })
      }
    }
  }

  deleteComment() {
    this.uid = this.storageService.getItem("uid") === "" ? 0 : Number(this.storageService.getItem("uid"));
    if(this.uid == 0) {
      Swal.fire({
        title: "You need to sign-in to do this action",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK",
        footer: '<a href="signin" style="color:red;font-size: 18px"><b>Click here to go to sign-in page<b/></a>'
      })
    }
    else {
      this.deleteCommentService.deleteComment(this.postId, this.commentData._id).subscribe({
        next: (response: DeleteCommentResponse) => {
          this.commentModified.emit(true);
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
          if(this.uid == 0) {
            Swal.fire({
              titleText: "Error delete comment. Please try again",
              icon: "error",
              heightAuto: true,
              showConfirmButton: true,
              focusCancel: false,
              focusConfirm: false
            })
          }
        }
      })
    }
  }

  deleteCommentByCommunityOwner() {
    this.uid = this.storageService.getItem("uid") === "" ? 0 : Number(this.storageService.getItem("uid"));
    if(this.uid == 0) {
      Swal.fire({
        title: "You need to sign-in to do this action",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "OK",
        footer: '<a href="signin" style="color:red;font-size: 18px"><b>Click here to go to sign-in page<b/></a>'
      })
    }
    else {
      this.deleteCommentService.deleteComment(this.postId, this.commentData._id).subscribe({
        next: (response: DeleteCommentResponse) => {
          this.commentModified.emit(true);
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
          if(this.uid == 0) {
            Swal.fire({
              titleText: "Error delete comment. Please try again",
              icon: "error",
              heightAuto: true,
              showConfirmButton: true,
              focusCancel: false,
              focusConfirm: false
            })
          }
        }
      })
    }
  }
}
