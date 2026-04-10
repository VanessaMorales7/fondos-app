import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscribirModal } from './suscribir-modal';

describe('SuscribirModal', () => {
  let component: SuscribirModal;
  let fixture: ComponentFixture<SuscribirModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscribirModal],
    }).compileComponents();

    fixture = TestBed.createComponent(SuscribirModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
