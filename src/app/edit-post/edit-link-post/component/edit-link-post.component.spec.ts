import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinkPostComponent } from './edit-link-post.component';

describe('EditLinkPostComponent', () => {
  let component: EditLinkPostComponent;
  let fixture: ComponentFixture<EditLinkPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLinkPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLinkPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
