import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDiscussionComponent } from './route-discussion.component';

describe('RouteDiscussionComponent', () => {
  let component: RouteDiscussionComponent;
  let fixture: ComponentFixture<RouteDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteDiscussionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
