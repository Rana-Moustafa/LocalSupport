import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePlacesComponent } from './profile-places.component';

describe('ProfilePlacesComponent', () => {
  let component: ProfilePlacesComponent;
  let fixture: ComponentFixture<ProfilePlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
