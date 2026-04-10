import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoCard } from './fondo-card';

describe('FondoCard', () => {
  let component: FondoCard;
  let fixture: ComponentFixture<FondoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(FondoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
