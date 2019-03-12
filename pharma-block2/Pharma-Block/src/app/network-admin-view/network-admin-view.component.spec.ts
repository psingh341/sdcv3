import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkAdminViewComponent } from './network-admin-view.component';

describe('NetworkAdminViewComponent', () => {
  let component: NetworkAdminViewComponent;
  let fixture: ComponentFixture<NetworkAdminViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkAdminViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
