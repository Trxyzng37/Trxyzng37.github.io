import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';
import { GetPostsService } from 'src/app/post-link-list/service/get-posts.service';
import { DateTimeService } from 'src/app/shared/services/date-time/date-time.service';
import { Comment } from 'src/app/view-detail-post/view-detail-post/pojo/comment';
import { GetPostService } from 'src/app/view-detail-post/view-detail-post/service/get-post/get-post.service';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrl: './comment-view.component.scss'
})
export class CommentViewComponent {
  public constructor(
    public sanitizer: DomSanitizer,
    private getPostService: GetPostService,
    private dateTimeService: DateTimeService
  ) {}

  @Input() commentData: Comment = new Comment(0,0,0,'','',0,'',0,'',0,false);
  public postInfo: GetPostResponse = new GetPostResponse(0,'',0,'','',0,'','','','','',0,0,0);

  ngOnInit() {
    this.commentData.created_at = this.dateTimeService.getTimeByCompareCreatedAtAndCurrentDate(this.commentData.created_at);
    this.commentData.content = this.commentData.content.replace("<img src=", "<img class='img_comment' src=");
    this.getPostService.getPostByPostId(this.commentData.post_id).subscribe({
      next: (response: GetPostResponse) => {
        this.postInfo = response;
      }
    })
  }

  navigateToPost() {
    window.location.href = "/post/" + this.postInfo.post_id;
  }
}
