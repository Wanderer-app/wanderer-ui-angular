import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinsDetailComponent } from './pins-detail.component';

describe('PinsDetailComponent', () => {
  let component: PinsDetailComponent;
  let fixture: ComponentFixture<PinsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
