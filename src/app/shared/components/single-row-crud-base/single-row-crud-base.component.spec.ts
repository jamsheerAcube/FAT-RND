import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRowCrudBaseComponent } from './single-row-crud-base.component';

describe('SingleRowCrudBaseComponent', () => {
  let component: SingleRowCrudBaseComponent;
  let fixture: ComponentFixture<SingleRowCrudBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRowCrudBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleRowCrudBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
