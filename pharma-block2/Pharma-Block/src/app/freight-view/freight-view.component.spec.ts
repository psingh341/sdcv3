import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightViewComponent } from './freight-view.component';

describe('FreightViewComponent', () => {
  let component: FreightViewComponent;
  let fixture: ComponentFixture<FreightViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
