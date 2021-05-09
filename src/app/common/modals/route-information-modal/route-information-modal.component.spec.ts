import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteInformationModalComponent } from './route-information-modal.component';

describe('RouteInformationModalComponent', () => {
  let component: RouteInformationModalComponent;
  let fixture: ComponentFixture<RouteInformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteInformationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
