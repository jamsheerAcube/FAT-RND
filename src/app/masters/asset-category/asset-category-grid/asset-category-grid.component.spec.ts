import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCategoryGridComponent } from './asset-category-grid.component';

describe('AssetCategoryGridComponent', () => {
  let component: AssetCategoryGridComponent;
  let fixture: ComponentFixture<AssetCategoryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCategoryGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetCategoryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
