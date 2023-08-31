import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmComponent } from './formm.component';

describe('FormmComponent', () => {
  let component: FormmComponent;
  let fixture: ComponentFixture<FormmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormmComponent]
    });
    fixture = TestBed.createComponent(FormmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
