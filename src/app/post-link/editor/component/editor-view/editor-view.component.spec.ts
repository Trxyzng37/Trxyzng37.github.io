import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorViewComponent } from './editor-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditorViewComponent', () => {
  let component: EditorViewComponent;
  let fixture: ComponentFixture<EditorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorViewComponent],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
