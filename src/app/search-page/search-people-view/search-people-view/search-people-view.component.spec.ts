import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPeopleViewComponent } from './search-people-view.component';

describe('SearchPeopleViewComponent', () => {
  let component: SearchPeopleViewComponent;
  let fixture: ComponentFixture<SearchPeopleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPeopleViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchPeopleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
