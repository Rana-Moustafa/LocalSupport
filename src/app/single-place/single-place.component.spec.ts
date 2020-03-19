import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlaceComponent } from './single-place.component';

describe('SinglePlaceComponent', () => {
  let component: SinglePlaceComponent;
  let fixture: ComponentFixture<SinglePlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
