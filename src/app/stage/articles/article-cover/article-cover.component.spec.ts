import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCoverComponent } from './article-cover.component';

describe('ArticleCoverComponent', () => {
  let component: ArticleCoverComponent;
  let fixture: ComponentFixture<ArticleCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
