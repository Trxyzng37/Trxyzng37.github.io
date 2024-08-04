import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImgPostComponent } from './edit-img-post.component';

describe('EditImgPostComponent', () => {
  let component: EditImgPostComponent;
  let fixture: ComponentFixture<EditImgPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditImgPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditImgPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
