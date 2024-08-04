import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {
  goBack() {
    window.history.back();
  }
}
