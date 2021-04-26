import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentControlMenuComponent } from './content-control-menu.component';

describe('ContentControlMenuComponent', () => {
  let component: ContentControlMenuComponent;
  let fixture: ComponentFixture<ContentControlMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentControlMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentControlMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
