import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { LucideAngularModule, RotateCcw, TrendingUp, History, Clock, Search } from 'lucide-angular';
import { provideRouter } from '@angular/router';
import { CopCurrencyPipe } from './core/pipes/cop-currency/cop-currency-pipe';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, LucideAngularModule.pick({ RotateCcw, TrendingUp, History, Clock }), CopCurrencyPipe],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('BTG Pactual');
  });
});
