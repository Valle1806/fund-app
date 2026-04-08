import { Fund, FundCategory } from '../models/fund.model';

export const FUNDS_MOCK: Fund[] = [
  { id: 1, name: 'FPV_BTG_PACTUAL_RECAUDADORA', minimumAmount: 75_000, category: FundCategory.FPV },
  { id: 2, name: 'FPV_BTG_PACTUAL_ECOPETROL', minimumAmount: 125_000, category: FundCategory.FPV },
  { id: 3, name: 'DEUDAPRIVADA', minimumAmount: 50_000, category: FundCategory.FIC },
  { id: 4, name: 'FDO-ACCIONES', minimumAmount: 250_000, category: FundCategory.FIC },
  { id: 5, name: 'FPV_BTG_PACTUAL_DINAMICA', minimumAmount: 100_000, category: FundCategory.FPV },
];
