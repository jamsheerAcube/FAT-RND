import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySingleRowCrudComponent } from './display-single-row-crud.component';

describe('DisplaySingleRowCrudComponent', () => {
  let component: DisplaySingleRowCrudComponent;
  let fixture: ComponentFixture<DisplaySingleRowCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySingleRowCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySingleRowCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
