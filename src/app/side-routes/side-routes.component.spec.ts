import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideRoutesComponent } from './side-routes.component';

describe('SideRoutesComponent', () => {
  let component: SideRoutesComponent;
  let fixture: ComponentFixture<SideRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
