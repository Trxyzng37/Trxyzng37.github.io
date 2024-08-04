import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostComponent } from './create-post.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TestComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostComponent],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
