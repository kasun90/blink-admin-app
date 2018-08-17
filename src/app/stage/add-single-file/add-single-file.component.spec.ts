import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSingleFileComponent } from './add-single-file.component';

describe('AddSingleFileComponent', () => {
  let component: AddSingleFileComponent;
  let fixture: ComponentFixture<AddSingleFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSingleFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSingleFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
