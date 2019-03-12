import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomsViewComponent } from './customs-view.component';

describe('CustomsViewComponent', () => {
  let component: CustomsViewComponent;
  let fixture: ComponentFixture<CustomsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
