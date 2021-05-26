import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaximizedImageComponent } from './maximized-image.component';

describe('MaximizedImageComponent', () => {
  let component: MaximizedImageComponent;
  let fixture: ComponentFixture<MaximizedImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaximizedImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaximizedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
