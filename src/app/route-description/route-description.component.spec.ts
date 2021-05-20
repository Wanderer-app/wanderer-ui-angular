import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDescriptionComponent } from './route-description.component';

describe('RouteDescriptionComponent', () => {
  let component: RouteDescriptionComponent;
  let fixture: ComponentFixture<RouteDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
