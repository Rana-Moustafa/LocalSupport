import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesCategoryComponent } from './places-category.component';

describe('PlacesCategoryComponent', () => {
  let component: PlacesCategoryComponent;
  let fixture: ComponentFixture<PlacesCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
