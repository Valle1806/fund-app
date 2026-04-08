import { Injectable } from '@angular/core';
import { Fund } from '../../models/fund.model';
import { delay, Observable, of } from 'rxjs';
import { FUNDS_MOCK } from '../../mocks/fund.mock';
/**
 * Servicio de gestión de fondos BTG.
 * Simula una API REST con of() + delay() para mostrar loading states reales.
 * 
 */
@Injectable({
  providedIn: 'root',
})
export class FundService {
  /** Latencia simulada en ms — imita un endpoint real */
  private readonly DELAY_MS = 800;


  getFunds(): Observable<Fund[]> {
    return of(FUNDS_MOCK).pipe(delay(this.DELAY_MS));
  }

}
