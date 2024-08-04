
  import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
  import { Router } from '@angular/router';
  import { GalleryItem } from 'ng-gallery';
  import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';
  import { StorageService } from 'src/app/shared/storage/storage.service';
  import { HttpErrorResponse } from '@angular/common/http';
  import { VotePostService } from '../../../../post-link/post-link/service/vote-post/vote-post.service';
  import { CheckVotePostService } from '../../../../post-link/post-link/service/check-vote-post/check-vote-post.service';
  import { CheckVotePostResponse } from '../../../../post-link/post-link/service/check-vote-post/pojo/check-vote-post-response';
  import { VotePostResponse } from '../../../../post-link/post-link/service/vote-post/pojo/vote-post-response';
  import { DateTimeService } from 'src/app/shared/services/date-time/date-time.service';
  import Swal from 'sweetalert2';
  import { DeletePostService } from 'src/app/edit-post/service/delete-post/delete-post.service';
  import { DeletePostResponse } from 'src/app/edit-post/pojo/delete-post-response';
  import { CommunityService } from 'src/app/shared/services/search-communites/community.service';
  import { JoinCommunityResponse } from 'src/app/shared/services/search-communites/pojo/join-community-response';
  import { Communities } from 'src/app/shared/pojo/pojo/communities';
  import { AllowPostService } from 'src/app/post-link/post-link/service/allow-post/allow-post.service';
  import { DefaultResponse } from 'src/app/shared/pojo/default-response';
  import { PresentationService } from 'src/app/shared/services/presentation/presentation.service';
  import { SavePostService } from 'src/app/shared/services/save-post/save-post.service';
  import { SavedPostResponse } from 'src/app/shared/services/save-post/pojo/saved-post-response';
  import { DarkModeService } from 'src/app/shared/services/dark-mode/dark-mode.service';
  import { VoteImgService } from 'src/app/shared/services/vote-img/vote-img.service';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';
  
  @Component({
    selector: 'app-post',
    templateUrl: './view-post.component.html',
    styleUrl: './view-post.component.scss'
  })
  export class PostComponent {
    constructor (
      private router: Router,
      private votePostServie: VotePostService,
      private storageService: StorageService,
      private dateTimeService: DateTimeService,
      private checkVotePostService: CheckVotePostService,
      private deletePostService: DeletePostService,
      private route: Router,
      private communityService: CommunityService,
      private allowPostService: AllowPostService,
      public presentationService: PresentationService,
      private savePostService: SavePostService,
      private darkmodeSerive: DarkModeService,
      public voteImgService: VoteImgService,
      private checkRefreshToken: CheckRefreshTokenService
    ) {}
  
    @Input() post: GetPostResponse = new GetPostResponse(0,"",0,"","",0,"","","","","",0,0,0);
    @Input() post_id: number = 0;
    @Input() type: string = "";
    @Input() communityName: string = "";
    @Input() uid: number = 0;
    @Input() username: string = "";
    @Input() title: string = "";
    @Input() content: string = "";
    @Input() created_at: string = "";
    @Input() vote: number = 1;
    @Input() communityIcon: string = "";
    @Input() index: number = 0;
    @Input() commentCount: number = 0;
  
    @Output() event = new EventEmitter<GetPostResponse>();
      
    public voteType: string = 'none'; //none upvote downvote
    public previousVote: number = this.vote;
    public shownDate: string = "";
    public isOptionMenuOpen: boolean = false;
    public isAuthor: boolean = false;
    public isCommunityOwner: boolean = false;
    public isAllow: boolean = false;
    public isHomePage: boolean = false;
    public isJoinCommunity: boolean = false;
    public isDeleted: boolean = false;
    public joinText: string = this.isJoinCommunity ? 'Leave' : 'Join';
    public communityInfo: Communities = new Communities(0,'',0,'','',0,'','',0,0);

    public  upvote = "../../../../../assets/icon/upvote.png"
    public  upvote_fill = "../../../../../assets/icon/upvote-fill.png"
    public  downvote = "../../../../../assets/icon/downvote.png"
    public  downvote_fill = "../../../../../assets/icon/downvote-fill.png"

    public saved: boolean = false;
    public savedText: string = this.saved ? 'Unsave' : "Save";

    ngOnInit() {
      this.darkmodeSerive.useDarkMode();
      this.voteImgService.selectDownVoteImg();
      this.voteImgService.selectUpVoteImg();
      const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
      const found = window.location.href.match('/home');
      if(found != null) 
        this.isHomePage = true;
      this.shownDate = this.dateTimeService.getTimeByCompareCreatedAtAndCurrentDate(this.created_at);
    }  

    ngOnChanges() {
      this.shownDate = this.dateTimeService.getTimeByCompareCreatedAtAndCurrentDate(this.created_at);
      const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
      this.isAuthor = uid == this.uid;
      this.checkVotePostService.checkVotePost(this.post_id, uid).subscribe({
        next: (response: CheckVotePostResponse) => {
          this.voteType  = response.vote_type;
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        }
      })
      if(this.post.post_id != 0) {
        this.isDeleted = this.post.deleted == 1 ? true : false;
        this.communityService.getCommunityInfoById(this.post.community_id.toString()).subscribe({
          next: (response: Communities) => {
            this.communityInfo = response;
            this.isCommunityOwner = uid == (this.communityInfo.uid != 0 ? this.communityInfo.uid : 0);
            this.isAllow = this.post.allow == 1 ? true : false;
          }
        })
      }
      this.savePostService.getSavedPostStatusByUid(uid, this.post_id).subscribe({
        next: (response: SavedPostResponse) => {
          this.saved = response.saved == 1 ? true : false;
          this.savedText = response.saved == 1 ? 'Unsave' : "Save";
        }
      })
    }
  
    preventClick(event: Event) {
      event.stopPropagation();
    }
  
    openOptionMenu(event: Event) {
      this.isOptionMenuOpen = !this.isOptionMenuOpen;
      event.stopPropagation();
    }

    editPost(event: Event) {
      this.router.navigate(["/edit-post/" + this.post_id]);
    }
  
    navigateToCommunity() {
      this.router.navigate(["/r/" + this.communityName]);
    }
  
    votePost(event: Event, type: string) {
      event.stopPropagation();
      if (this.voteType === 'none' && type === 'upvote') {
        this.previousVote = this.vote;
        this.vote += 1;
        this.voteType = 'upvote';
      }
      else if (this.voteType === 'none' && type === 'downvote') {
        this.previousVote = this.vote;
        this.vote -= 1;
        this.voteType = 'downvote';
      }
      else if (this.voteType === 'upvote' && type === 'upvote') {
        this.previousVote = this.vote;
        this.vote -= 1;
        this.voteType = 'none';
      }
      else if (this.voteType === 'upvote' && type === 'downvote') {
        this.previousVote = this.vote;
        this.vote -= 2;
        this.voteType = 'downvote';
      }
      else if (this.voteType === 'downvote' && type === 'upvote') {
        this.previousVote = this.vote;
        this.vote += 2;
        this.voteType = 'upvote';
      }
      else if (this.voteType === 'downvote' && type === 'downvote') {
        this.previousVote = this.vote;
        this.vote += 1;
        this.voteType = 'none';
      }
      console.log(this.post_id + ": " + this.vote);
      this.sendVotePostToServer();
    }
  
    sendVotePostToServer() {
      const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
      this.votePostServie.votePost(this.post_id, this.vote, uid, this.voteType).subscribe({
        next: (response: VotePostResponse) => {
          console.log("Vote post_id: "+response.post_id);
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
          this.vote = this.previousVote;
          this.voteType = 'none';
          console.log("Error vote post");
          console.log("vote when error: "+this.vote);
        }
      })
    }

    deletePost() {
      Swal.fire({
        titleText: "Are you sure you want to delete this post",
        icon: "warning",
        heightAuto: true,
        showCancelButton: true,
        showConfirmButton: true,
        focusCancel: false,
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
          this.deletePostService.deletePost("/delete-post", this.post_id, uid, 'user').subscribe({
            next: (response: DeletePostResponse) => {
              Swal.fire('Delete post successfully', '', 'success').then((result) => {
                if (result.isConfirmed)
                  window.location.href = "r/" + this.post.community_id;
              })
            },
            error: (e: HttpErrorResponse) => {
              Swal.fire('Error delete post. Please try again', '', 'error')
            }
          })
        }
      })
    }

    joinCommunity(event: Event) {
      event.stopPropagation();
      const uid: number = this.storageService.getItem("uid") == "" ? 0 :  Number.parseInt(this.storageService.getItem("uid"));
      this.communityService.joinCommunity(uid, this.post.community_id, this.isJoinCommunity == false ? 1 : 0).subscribe({
        next: (response: JoinCommunityResponse) => {
          this.isJoinCommunity = response.join_community == 0 ? false : true;
          this.joinText = this.isJoinCommunity ? 'Leave' : 'Join';
        },
        error: (e: HttpErrorResponse) => {
          console.log("error join community");
        }
      })
    }

    allowPost(event: Event) {
      this.allowPostService.setAllowPost(this.post_id, 1).subscribe({
        next: (response: DefaultResponse) => {
          this.isAllow = false;
        }
      })
    }

    notAllowPost() {
      Swal.fire({
        titleText: "Delete this post ?",
        text: "Change can not be undo",
        icon: 'warning',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        showConfirmButton: true
      }).then((result) => {
        if(result.isConfirmed) {
          this.deletePostService.deletePost("/delete-post", this.post_id, this.post.uid, 'moderator').subscribe({
            next: (response: DeletePostResponse) => {
              this.isDeleted = true;
              this.title = "[Deleted by moderator]"
              this.content = "[Deleted by moderator]";
              this.type = "editor";
            },
            error: (e: HttpErrorResponse) => {
            }
          })
        }
      })
    }

    savePost(event: Event) {
      event.stopPropagation();
      const uid: number = this.storageService.getItem("uid") == "" ? 0 :  Number.parseInt(this.storageService.getItem("uid"));
      const saveStatus = !this.saved ? 1 : 0;
      this.savePostService.savePostByUid(uid, this.post_id, saveStatus).subscribe({
        next: (response: DefaultResponse) => {
          this.saved = !this.saved;
          this.savedText = this.saved ? "Unsave" : "Save";
        },
        error: (e: HttpErrorResponse) => {}
      })
    }
  }
  
