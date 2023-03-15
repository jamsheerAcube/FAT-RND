import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNumerictextboxComponent } from './form-numerictextbox.component';

describe('FormNumerictextboxComponent', () => {
  let component: FormNumerictextboxComponent;
  let fixture: ComponentFixture<FormNumerictextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNumerictextboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNumerictextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
