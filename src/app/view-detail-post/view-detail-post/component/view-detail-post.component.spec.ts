import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailPostComponent } from './view-detail-post.component';

describe('ViewDetailPostComponent', () => {
  let component: ViewDetailPostComponent;
  let fixture: ComponentFixture<ViewDetailPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDetailPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
