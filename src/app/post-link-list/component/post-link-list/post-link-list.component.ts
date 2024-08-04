import { Component } from '@angular/core';
import { PostResponse } from '../../pojo/post-response';
import { GetPostsService } from '../../service/get-posts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-link-list',
  templateUrl: './post-link-list.component.html',
  styleUrl: './post-link-list.component.scss'
})
export class PostLinkListComponent {
  public constructor(
    private getPostService: GetPostsService
  ) {}

  public post_result: PostResponse[] = [];

  ngOnInit() {
    this.getPostService.getAllPosts().subscribe({
      next: (response: PostResponse[]) => {
        this.post_result = response;
        console.log(this.post_result)
      },
      error: (e: HttpErrorResponse) => {
        console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
      }
    })

  }
}
