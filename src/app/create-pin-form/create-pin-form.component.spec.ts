import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePinFormComponent } from './create-pin-form.component';

describe('CreatePinFormComponent', () => {
  let component: CreatePinFormComponent;
  let fixture: ComponentFixture<CreatePinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePinFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
