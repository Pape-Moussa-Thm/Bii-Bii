import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerComponent } from './lister.component';

describe('ListerComponent', () => {
  let component: ListerComponent;
  let fixture: ComponentFixture<ListerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListerComponent]
    });
    fixture = TestBed.createComponent(ListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
