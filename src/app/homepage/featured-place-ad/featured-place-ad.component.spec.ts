import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPlaceAdComponent } from './featured-place-ad.component';

describe('FeaturedPlaceAdComponent', () => {
  let component: FeaturedPlaceAdComponent;
  let fixture: ComponentFixture<FeaturedPlaceAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedPlaceAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedPlaceAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
