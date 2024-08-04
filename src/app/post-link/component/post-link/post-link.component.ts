import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-link',
  templateUrl: './post-link.component.html',
  styleUrl: './post-link.component.scss'
})
export class PostLinkComponent {
  constructor (
    private router: Router
  ) {}

  @Input() post_id: number = 0;
  @Input() communityName: string = "";
  @Input() userName: string = "";
  @Input() created_at: string = "";
  @Input() vote: number = 1;
  @Input() communityIcon: string = "";


  on_click() {
    this.router.navigate(["/id/" + this.post_id]);
  }
}
