import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProfileDetailsComponent } from './display-profile-details.component';

describe('DisplayProfileDetailsComponent', () => {
  let component: DisplayProfileDetailsComponent;
  let fixture: ComponentFixture<DisplayProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
