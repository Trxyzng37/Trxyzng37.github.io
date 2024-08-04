import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPostsService } from 'src/app/post-link-list/service/get-posts.service';
import { ActivatedRoute } from '@angular/router';
import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';
import { Communities } from 'src/app/shared/pojo/pojo/communities';
import { CommunityService } from 'src/app/shared/services/search-communites/community.service';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {

  public constructor(
    private getPostService: GetPostsService,
    private activeRoute: ActivatedRoute,
    private checkRefreshTokenService: CheckRefreshTokenService
  ) {}

  public search_text: string = "";
  public posts: GetPostResponse[] = [];
  public isSortOptionShow: boolean = false;
  public sort_option: string = "New";
  public searchOption: string = "posts";

  ngOnInit() {
    this.search_text = this.activeRoute.snapshot.params['text'];
    this.searchPosts("new");
    this.checkRefreshTokenService.runCheckRefreshTokenWithoutNotification();
  }

  showSortOption() {
    this.isSortOptionShow = !this.isSortOptionShow;
  }

  selectSearchOption(search_type: string) {
    this.searchOption = search_type;
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
    if(this.searchOption == "posts") {
      this.searchPosts(sort_option);
    }
  }

  searchPosts(sort: string) {
    this.getPostService.getPostForSearch("/get-search-posts", this.search_text, sort).subscribe({
      next: (response: GetPostResponse[]) => {
        this.posts = response;
      }
    })
  }
}
