import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageToolbarComponent } from './stage-toolbar.component';

describe('StageToolbarComponent', () => {
  let component: StageToolbarComponent;
  let fixture: ComponentFixture<StageToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
