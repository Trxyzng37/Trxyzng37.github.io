import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPostsService } from 'src/app/post-link-list/service/get-posts.service';
import { ActivatedRoute } from '@angular/router';
import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';

@Component({
  selector: 'user-profile-post-view',
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss'
})
export class PostViewComponent {
  public constructor(
    private getPostService: GetPostsService,
    private activeRoute: ActivatedRoute
  ) {}

  @Input() uid: number = 0;

  public posts: GetPostResponse[] = [];

  ngOnInit() {
  }

  ngOnChanges() {
    this.getPostService.getPostByUser("/get-posts-by-uid", this.uid, "new").subscribe({
      next: (response: GetPostResponse[]) => {
        this.posts = response;
      }
    })
  }
}
