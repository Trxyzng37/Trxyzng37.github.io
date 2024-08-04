import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { GetPostResponse } from '../../pojo/get-post-response';
import { GetPostsService } from '../../service/get-posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { DateTimeService } from 'src/app/shared/services/date-time/date-time.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { RecentVisitService } from 'src/app/shared/services/recent-visit/recent-visit.service';
import { DefaultResponse } from 'src/app/shared/pojo/default-response';
import { SearchUserProfileService } from 'src/app/shared/services/search-user-profile/search-user-profile.service';
import { UserProfile } from 'src/app/shared/pojo/pojo/user-profile';
import Swal from 'sweetalert2';
import { SavePostService } from 'src/app/shared/services/save-post/save-post.service';
import { DarkModeService } from 'src/app/shared/services/dark-mode/dark-mode.service';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';
@Component({
  selector: 'app-post-link-list',
  templateUrl: './post-link-list.component.html',
  styleUrl: './post-link-list.component.scss'
})
export class PostLinkListComponent {
  public constructor(
    private getPostService: GetPostsService,
    private sanitizer: DomSanitizer,
    private DatetimeService: DateTimeService,
    private activeRoute: ActivatedRoute,
    private storageService: StorageService,
    private recentVisitService: RecentVisitService,
    private savePostService: SavePostService,
    private searchUserProfileService: SearchUserProfileService,
    private darkmodeSerive: DarkModeService,
    private checkRefreshToken: CheckRefreshTokenService
  ) {}

  @Input() searchOption: string = "posts";
  @Output() isLoadEvent = new EventEmitter<boolean>();

  post_result: GetPostResponse[] = [];
  public isSortOptionShow: boolean = false;
  public isCommunityPage: boolean = false;
  public isHomePage: boolean = false;
  public isPopularPage: boolean = false;
  public isControlPage: boolean = false;
  public isUserPage: boolean = false;
  public sort_option: string = "New";
  public community_id: number = 0;
  public user_id: number = 0;
  public joinCommunityEventCount: number = 0;

  ngOnInit() {
    // this.checkRefreshToken.checkRefreshToken().subscribe({
    //   next: (response: any) => {

    //   },
    //   error: (e: HttpErrorResponse) => {
    //     const uid_exist: boolean = this.storageService.getItem("uid") == "" ? false : true;
    //     if(uid_exist) {
    //       this.storageService.removeItem("uid");
    //       window.location.reload();
    //     }
    //   }
    // })
    this.checkRefreshToken.runCheckRefreshTokenWithoutNotification();
    this.darkmodeSerive.useDarkMode();
    const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
    this.isCommunityPage = window.location.href.includes("/r/");
    this.isHomePage = window.location.href.includes("/home");
    this.isPopularPage = window.location.href.includes("/popular");
    this.isControlPage = window.location.href.includes("/control-posts/");
    this.isUserPage = window.location.href.includes("/user/");
    if(this.isHomePage) {
      this.getHomePost(uid, "hot");
    }
    if(this.isCommunityPage) {
      let regex = '/r/([0-9]+)';
      const a = window.location.href.match(regex);
      if(a!=null) {
        this.community_id = Number.parseInt(a[1]);
        this.getCommunityPost("hot");
        if(uid != 0) {
          this.recentVisitService.setRecentVisit("/set-recent-visit-community", uid, this.community_id).subscribe({
            next: (response: DefaultResponse) => {}
          })
        }
        else {
          let recent_communities_array: number[] = this.storageService.getItem("recent_communities") == "" ? [] : JSON.parse("[" + this.storageService.getItem("recent_communities") + "]");
          recent_communities_array = recent_communities_array.filter(
            (id) => {return id != this.community_id;}
          )
          let t = recent_communities_array.unshift(this.community_id);
          this.storageService.setItem("recent_communities", recent_communities_array.toString());
        }
      }
    }
    if(this.isPopularPage) {
      this.getPopularPost(uid, "hot");
    }
    if(this.isControlPage) {
      this.community_id = this.activeRoute.snapshot.params["community_id"];
      this.getCommunityPostNotAllow(this.community_id);
    }
    if(this.isUserPage) {
      const username = this.activeRoute.snapshot.params['username'];
      this.searchUserProfileService.getUserProfileByName("/get-user-info-by-username", username).subscribe({
        next: (response: UserProfile) => {
          this.user_id = response.uid;
          this.getUserPost("new");
        }
      })
    }
  }

  @HostListener('document:click', ['$event'])
  closeProfileMenu(event: Event) {
      this.isSortOptionShow = false;
      const cellText = document.getSelection();
      if (cellText?.type === 'Range') 
        event.stopPropagation();
  }

  ngOnChanges() {
    if(this.user_id != 0 && this.searchOption == "wait_for_approve")
      this.getPostsByUidAndNotAllow(this.user_id);
    if(this.user_id != 0 && this.searchOption == "saved")
      this.getSavedPostsByUid(this.user_id);
  }

  addPost(o: GetPostResponse) {
    this.post_result.push(o);
  }

  selectSort(sort_type: string) {
    this.sort_option = sort_type;
    this.isSortOptionShow = !this.isSortOptionShow;
    let sort_option = "";
    switch(sort_type) {
      case "Hot":
        sort_option = "hot";
        break;
      case "New":
        sort_option = "new";
        break;
      case "Top today":
        sort_option = "top_day";
        break; 
      case "Top this week":
        sort_option = "top_week";
        break;   
      case "Top this month":
        sort_option = "top_month";
        break;
      case "Top this year":
        sort_option = "top_year";
        break;
      case "Top all time":
        sort_option = "top_all_time";
        break;                      
    }
    const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
    if(this.isCommunityPage)
      this.getCommunityPost(sort_option);
    if(this.isPopularPage)
      this.getPopularPost(uid, sort_option);
    if(this.isHomePage)
      this.getHomePost(uid, sort_option);
    if(this.isUserPage) 
      this.getUserPost(sort_option);
  }

  showSortOption(event: any) {
    event.stopPropagation();
    this.isSortOptionShow = !this.isSortOptionShow;
  }

  getHomePost(uid: number, sort_type: string) {
    this.getPostService.getHomePosts("/get-home-posts", uid, sort_type).subscribe({
      next: (response: GetPostResponse[]) => {
        this.post_result = response;
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
      }
    })
  }

  getPopularPost(uid: number, sort_type: string) {
    this.getPostService.getPopularPosts("/get-popular-posts", uid, sort_type).subscribe({
      next: (response: GetPostResponse[]) => {
        this.post_result = response;
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
      }
    })
  }

  getCommunityPost(sort_type: string) {
    this.getPostService.getPostInCommunity("/get-community-posts", this.community_id, sort_type).subscribe({
      next: (response: GetPostResponse[]) => {
        this.post_result = response;
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
      }
    })
  }

  getCommunityPostNotAllow(uid: number) {
    this.getPostService.getPostInCommunityNotAllow("/get-control-posts", this.community_id).subscribe({
      next: (response: GetPostResponse[]) => {
        this.post_result = response;
        // let index = 0;
        // setInterval(() => {
        //   if(index < response.length) {
        //     this.post_result.push(response[index]);
        //     index++;
        //   }
        // }, 300);
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
      }
    })
  }

  getUserPost(sort_type: string) {
    this.getPostService.getPostByUser("/get-posts-by-uid", this.user_id, sort_type).subscribe({
      next: (response: GetPostResponse[]) => {
        this.post_result = response;
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
      }
    })
  }

  joinCommunityEvent(event: Event) {
    this.joinCommunityEventCount += 1;
    console.log("post-link-list: "+this.joinCommunityEventCount)
  }

  allowPostEvent(post_id: number) {
    this.post_result = this.post_result.filter( post => {
      return post.post_id !== post_id
    } )
  }

  showProgress = false;
  getPostsByUidAndNotAllow(uid: number) {
    this.showProgress = true;
    this.getPostService.getPostsByUidAndNotAllowAndNotDeleted("/get-posts-by-uid-not-delete-not-allow", uid).subscribe({
      next: (response: GetPostResponse[]) => {
        this.post_result = response;
        this.showProgress = false;
        this.isLoadEvent.emit(true);
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
      }
    })
  }

  getSavedPostsByUid(uid: number) {
    this.showProgress = true;
    this.savePostService.getSavedPostsByUid(uid).subscribe({
      next: (response: GetPostResponse[]) => {
        this.post_result = response;
        this.showProgress = false;
        this.isLoadEvent.emit(true);
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
      }
    })
  }
}
