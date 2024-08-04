import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCommunityViewComponent } from './search-community-view.component';

describe('SearchCommunityViewComponent', () => {
  let component: SearchCommunityViewComponent;
  let fixture: ComponentFixture<SearchCommunityViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCommunityViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchCommunityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
