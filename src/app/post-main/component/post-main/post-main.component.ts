import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';
import { Communities } from 'src/app/shared/pojo/pojo/communities';
import { JoinCommunityResponse } from 'src/app/shared/services/search-communites/pojo/join-community-response';
import { CommunityService } from 'src/app/shared/services/search-communites/community.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { GetPostService } from 'src/app/view-detail-post/view-detail-post/service/get-post/get-post.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-main',
  templateUrl: './post-main.component.html',
  styleUrl: './post-main.component.scss'
})
export class PostMainComponent {

  public constructor (
    private communityService: CommunityService,
    private storageService: StorageService,
    private getPostService: GetPostService,
    private activeRoute: ActivatedRoute
  ) {}

  public isCommunityPage: boolean = false;
  public isViewPostPage: boolean = false;
  public isJoinCommunity: boolean = false;
  public isControlPage: boolean = false;
  public isEditCommunityPage: boolean = false;
  public isUserSettingPage: boolean = false;
  public isUserPage: boolean = false;
  public isOwner: boolean = false;
  public isUser: boolean = false;

  public community_id: number = 0;
  public community: Communities = new Communities(0, "", 0, "", "", 0, "", "", 0, 0);
  public banner_url: string = "../../../assets/banner/lol.png";
  public avatar_url: string = "../../../assets/icon/tft.jpg";
  public joinText: string = this.isJoinCommunity ? 'Joined' : 'Join';

  ngOnInit() {
    const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
    this.isUser = uid != 0;
    this.isCommunityPage = window.location.href.includes("/r/");
    this.isUserSettingPage = window.location.href.includes("/setting/");
    this.isViewPostPage = window.location.href.includes("/post/");
    this.isControlPage = window.location.href.includes("/control-posts/");
    this.isUserPage = window.location.href.includes("/user/");
    this.isEditCommunityPage = window.location.href.includes("/edit-community/");
    if(this.isCommunityPage || this.isEditCommunityPage) {
      let regex = this.isCommunityPage ? '/r/([0-9]+)' : '/edit-community/([0-9]+)';
      const a = window.location.href.match(regex);
      if(a != null) {
        this.community_id = Number.parseInt(a[1]);
        this.communityService.getCommunityInfoById(a[1]).subscribe({
          next: (response: Communities) => {
            this.community = response;
            this.isOwner = uid == this.community.uid;
            if(this.community.deleted == 1)
              Swal.fire("The community\nr/"+this.community.name+"\nhas been deleted","","warning").then((result)=> {
                if(result.isConfirmed) 
                  window.history.back();
              })
          }
        })
        this.communityService.checkJoinCommunityStatus(uid, this.community_id).subscribe({
          next: (response: JoinCommunityResponse) => {
            this.isJoinCommunity = response.join_community == 0 ? false : true;
            this.joinText = this.isJoinCommunity ? 'Joined' : 'Join';
          }
        })
      }
    }
    if(this.isViewPostPage) {
      let regex = '/post/([0-9]+)';
      const a = window.location.href.match(regex);
      if(a != null) {
        this.getPostService.getPostByPostId(Number.parseInt(a[1])).subscribe({
          next: (response: GetPostResponse) => {
            this.community_id = response.community_id;
            this.communityService.getCommunityInfoById(response.community_id.toString()).subscribe({
              next: (response: Communities) => {
                this.community = response;
                this.isOwner = uid == this.community.uid;
              }
            })
          }
        })
      }
    }
    if(this.isControlPage) {
      let regex = '/control-posts/([0-9]+)';
      const a = window.location.href.match(regex);
      if(a != null) {
        this.community_id = Number.parseInt(a[1]);
        this.communityService.getCommunityInfoById(a[1].toString()).subscribe({
          next: (response: Communities) => {
            this.community = response;
            this.isOwner = uid == this.community.uid;
            if(this.community.deleted == 1)
              Swal.fire("The community\nr/"+this.community.name+"\nhas been deleted","","warning").then((result)=> {
                if(result.isConfirmed) 
                  window.history.back();
              })
          }
        })
        this.communityService.checkJoinCommunityStatus(uid, this.community_id).subscribe({
          next: (response: JoinCommunityResponse) => {
            this.isJoinCommunity = response.join_community == 0 ? false : true;
            this.joinText = this.isJoinCommunity ? 'Joined' : 'Join';
          }
        })
      }
    }
}

  joinCommunity() {
    const uid: number = this.storageService.getItem("uid") == "" ? 0 :  Number.parseInt(this.storageService.getItem("uid"));
    this.communityService.joinCommunity(uid, this.community_id, this.isJoinCommunity == false ? 1 : 0).subscribe({
      next: (response: JoinCommunityResponse) => {
        this.isJoinCommunity = response.join_community == 0 ? false : true;
        this.joinText = this.isJoinCommunity ? 'Joined' : 'Join';
      },
      error: (e: HttpErrorResponse) => {
        console.log("error join community");
      }
    })
  }

  editCommunity() {
    window.location.href = "/edit-community/"+this.community_id;
  }

  createPost() {
    window.location.href = "/create-post?cid="+this.community_id;
  }
}
