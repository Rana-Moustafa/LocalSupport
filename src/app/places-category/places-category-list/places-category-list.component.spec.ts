import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesCategoryListComponent } from './places-category-list.component';

describe('PlacesCategoryListComponent', () => {
  let component: PlacesCategoryListComponent;
  let fixture: ComponentFixture<PlacesCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
