import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFiltersComponent } from './card-filters.component';

describe('CardFiltersComponent', () => {
  let component: CardFiltersComponent;
  let fixture: ComponentFixture<CardFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
