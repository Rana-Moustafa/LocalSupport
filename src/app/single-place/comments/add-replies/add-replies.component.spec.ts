import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepliesComponent } from './add-replies.component';

describe('AddRepliesComponent', () => {
  let component: AddRepliesComponent;
  let fixture: ComponentFixture<AddRepliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRepliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
