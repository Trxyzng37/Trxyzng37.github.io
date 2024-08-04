import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEditorPostComponent } from './edit-editor-post.component';

describe('EditEditorPostComponent', () => {
  let component: EditEditorPostComponent;
  let fixture: ComponentFixture<EditEditorPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEditorPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEditorPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
