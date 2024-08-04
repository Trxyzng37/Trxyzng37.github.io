import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DeletePostService } from 'src/app/edit-post/service/delete-post/delete-post.service';
import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';
import { DateTimeService } from 'src/app/shared/services/date-time/date-time.service';
import { PresentationService } from 'src/app/shared/services/presentation/presentation.service';
import { CommunityService } from 'src/app/shared/services/search-communites/community.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { Comment } from 'src/app/view-detail-post/view-detail-post/pojo/comment';
import { GetCommentsService } from 'src/app/view-detail-post/view-detail-post/service/get-comments/get-comments.service';

@Component({
  selector: 'app-search-post-view',
  templateUrl: './search-post-view.component.html',
  styleUrl: './search-post-view.component.scss'
})
export class SearchPostViewComponent {
  constructor (
    private router: Router,
    private storageService: StorageService,
    private dateTimeService: DateTimeService,
    private getCommentService: GetCommentsService,
    public presentationService: PresentationService
  ) {}

  @Input() post!: GetPostResponse;

  public voteType: string = 'none'; //none upvote downvote
  public shownDate: string = "";
  public comment_count: number = 0;
  public img: string = "";

  ngOnInit() {
    this.shownDate = this.dateTimeService.getTimeByCompareCreatedAtAndCurrentDate(this.post.created_at);
    const uid: number = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
    this.getCommentService.getComments(this.post.post_id).subscribe({
      next: (response: Comment[]) => {
        this.comment_count = response.length;
      }
    })
  }  

  ngOnChanges() {
    if(this.post.type == "link") {
      this.img = JSON.parse(this.post.content).image;
    }
    if(this.post.type == "img") {
      this.img = JSON.parse(this.post.content)[0].data;
    }
    if(this.post.type == "editor") {
      const found = this.post.content.match('src="([^"]*)"')
      if(found)
        this.img = found[1];
      else 
        this.img = "";
    }
  }

  navigateToPostView() {
    window.location.href = "/post/" + this.post.post_id;
  }

  navigateToCommunity(event: Event) {
    event.stopPropagation();
    window.location.href = "/r/" + this.post.community_id;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  showCount: number = 0;
  onIntersection({ target, visible }: { target: Element; visible: boolean }) {
    // if (visible) {
    //   console.log("Post index: "+this.index);
    //   this.showCount++;
    //   if(this.showCount == 1) {
    //     const uid: number = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
    //     this.showPostService.setShowPost(uid, this.post_id, 1).subscribe({})
    //   }
  }

  // addNewPost(o: GetPostResponse) {
  //   this.event.emit(o);
  // }
}
