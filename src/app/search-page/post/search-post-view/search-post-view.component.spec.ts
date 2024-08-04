import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPostViewComponent } from './search-post-view.component';

describe('SearchPostViewComponent', () => {
  let component: SearchPostViewComponent;
  let fixture: ComponentFixture<SearchPostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPostViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchPostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
