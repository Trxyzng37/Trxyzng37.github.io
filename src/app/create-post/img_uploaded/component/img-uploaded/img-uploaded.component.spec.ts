import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgUploadedComponent } from './img-uploaded.component';

describe('ImgUploadedComponent', () => {
  let component: ImgUploadedComponent;
  let fixture: ComponentFixture<ImgUploadedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgUploadedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgUploadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
