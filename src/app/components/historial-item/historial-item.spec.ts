import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialItem } from './historial-item';

describe('HistorialItem', () => {
  let component: HistorialItem;
  let fixture: ComponentFixture<HistorialItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialItem],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
