import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GetOpenGraphService } from '../../service/getOpenGraph/get-open-graph.service';
import { OpenGraphResponse } from '../../pojo/open-graph-response';
import { HttpErrorResponse } from '@angular/common/http';
// import { parseFromDocument } from 'parse-open-graph';
@Component({
  selector: 'app-link-view',
  templateUrl: './link-view.component.html',
  styleUrl: './link-view.component.scss'
})
export class LinkViewComponent {

  public constructor(
    public sanitizer: DomSanitizer,
    private openGraphService: GetOpenGraphService
  ) {}

  @Input() title: string = "";
  @Input() content: string = "";
  
  public isYoutubeLink: boolean = false;
  public data!: OpenGraphResponse;
  regex = /https:\/\/www\.youtube\.com\/watch\?v=([^]+)/;
  
  ngOnInit() {
    this.data = JSON.parse(this.content);
    // alert(this.data.link)
    // if (this.data?.link.match(this.regex)) {
    //   this.isYoutubeLink = true;
    //   const videoId = this.data.link.match(this.regex)
    //   this.data.link = `https://www.youtube.com/embed/${videoId![1]}`;
    // }
    // else {
      // if(this.data.image == "")
      //   this.data.image = "../../../../../assets/icon/logo.png";
    // }
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }
}


