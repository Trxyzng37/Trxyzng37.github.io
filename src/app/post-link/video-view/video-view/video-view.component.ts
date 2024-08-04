import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrl: './video-view.component.scss'
})
export class VideoViewComponent {

  @Input() content: string = "";
}
