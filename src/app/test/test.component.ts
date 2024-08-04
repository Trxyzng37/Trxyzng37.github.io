import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  constructor () {}
  public editorContent ="";

  onContentChanged = (event: any) =>{
    this.editorContent = event.html;
    // alert(this.editorContent)
  }
  public quillConfig = {
    toolbar: {
      container: [
        ['bold', 
         'italic', 
         'underline', 
         'strike', 
         { 'header': 1 },  
         { 'script': 'sub'}, 
         { 'script': 'super' },
         { 'list': 'ordered'}, 
         { 'list': 'bullet' },
         'blockquote', 
         'code-block',
         'link', 
         'image', 
         'video', 
        ],
      ],
    },
  }
}
