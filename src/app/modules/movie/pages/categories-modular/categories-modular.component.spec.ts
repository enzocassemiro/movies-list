import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesModularComponent } from './categories-modular.component';

describe('CategoriesModularComponent', () => {
  let component: CategoriesModularComponent;
  let fixture: ComponentFixture<CategoriesModularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesModularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesModularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
