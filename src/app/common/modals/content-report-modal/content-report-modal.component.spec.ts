import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentReportModalComponent } from './content-report-modal.component';

describe('ContentReportModalComponent', () => {
  let component: ContentReportModalComponent;
  let fixture: ComponentFixture<ContentReportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentReportModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
