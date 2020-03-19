import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPlacesComponent } from './related-places.component';

describe('RelatedPlacesComponent', () => {
  let component: RelatedPlacesComponent;
  let fixture: ComponentFixture<RelatedPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
