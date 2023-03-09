import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSearchModalComponent } from './card-search-modal.component';

describe('CardSearchModalComponent', () => {
  let component: CardSearchModalComponent;
  let fixture: ComponentFixture<CardSearchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSearchModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
