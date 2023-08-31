import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleventeComponent } from './articlevente.component';

describe('ArticleventeComponent', () => {
  let component: ArticleventeComponent;
  let fixture: ComponentFixture<ArticleventeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleventeComponent]
    });
    fixture = TestBed.createComponent(ArticleventeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
