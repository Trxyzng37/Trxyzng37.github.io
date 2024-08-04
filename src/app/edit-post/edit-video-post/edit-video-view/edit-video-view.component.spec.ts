import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideoViewComponent } from './edit-video-view.component';

describe('EditVideoViewComponent', () => {
  let component: EditVideoViewComponent;
  let fixture: ComponentFixture<EditVideoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVideoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditVideoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
