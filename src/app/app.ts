import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, CurrencyPipe, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  readonly navItems = [
    { route: '/funds',        label: 'Fondos',      icon: 'trending-up' },
    { route: '/portfolio',    label: 'Portafolio',  icon: 'wallet' },
    { route: '/transactions', label: 'Historial',   icon: 'clock' },
  ];
}
