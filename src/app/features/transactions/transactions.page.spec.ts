import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, Clock, Search, ArrowUpRight, ArrowDownLeft, Mail, MessageSquare, Mailbox } from 'lucide-angular';
import { TransactionsPage } from './transactions.page';
import { FinanceFacade } from '../../core/facades/finance-facade/finance-facade';
import { of } from 'rxjs';

describe('TransactionsPage', () => {
  let component: TransactionsPage;
  let fixture: ComponentFixture<TransactionsPage>;

  const mockFacade = {
    transactions$: of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionsPage,
        LucideAngularModule.pick({ Clock, Search, ArrowUpRight, ArrowDownLeft, Mail, MessageSquare, Mailbox })
      ],
      providers: [
        { provide: FinanceFacade, useValue: mockFacade }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
