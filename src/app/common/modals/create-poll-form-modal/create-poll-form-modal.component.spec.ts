import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePollFormModalComponent } from './create-poll-form-modal.component';

describe('CreatePollFormModalComponent', () => {
  let component: CreatePollFormModalComponent;
  let fixture: ComponentFixture<CreatePollFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePollFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePollFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
