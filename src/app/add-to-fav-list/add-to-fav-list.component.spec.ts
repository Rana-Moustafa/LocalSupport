import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFavListComponent } from './add-to-fav-list.component';

describe('AddToFavListComponent', () => {
  let component: AddToFavListComponent;
  let fixture: ComponentFixture<AddToFavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToFavListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToFavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
