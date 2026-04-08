import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundCardComponent } from './fund-card.component';

describe('FundCard', () => {
  let component: FundCardComponent;
  let fixture: ComponentFixture<FundCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
