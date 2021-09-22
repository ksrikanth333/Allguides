import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAvailableBooksComponent } from './search-available-books.component';

describe('SearchAvailableBooksComponent', () => {
  let component: SearchAvailableBooksComponent;
  let fixture: ComponentFixture<SearchAvailableBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAvailableBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAvailableBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
