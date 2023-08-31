import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginateComponent } from './paginate.component';

describe('PaginateComponent', () => {
  let component: PaginateComponent;
  let fixture: ComponentFixture<PaginateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginateComponent]
    });
    fixture = TestBed.createComponent(PaginateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
