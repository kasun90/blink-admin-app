import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPresetComponent } from './new-preset.component';

describe('NewPresetComponent', () => {
  let component: NewPresetComponent;
  let fixture: ComponentFixture<NewPresetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPresetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
