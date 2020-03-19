import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPalceComponent } from './add-new-palce.component';

describe('AddNewPalceComponent', () => {
  let component: AddNewPalceComponent;
  let fixture: ComponentFixture<AddNewPalceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPalceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPalceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
