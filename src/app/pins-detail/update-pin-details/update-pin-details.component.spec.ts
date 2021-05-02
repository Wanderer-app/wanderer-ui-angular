import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePinDetailsComponent } from './update-pin-details.component';

describe('UpdatePinDetailsComponent', () => {
  let component: UpdatePinDetailsComponent;
  let fixture: ComponentFixture<UpdatePinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePinDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
