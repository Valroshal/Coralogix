import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/currency-converter', pathMatch: 'full' },
  { path: 'currency-converter', loadComponent: () => import('./pages/currency-converter/currency-converter.component').then(m => m.CurrencyConverterComponent) },
  { path: 'history', loadComponent: () => import('./pages/history/history.component').then(m => m.HistoryComponent) },
  { path: 'chart', loadComponent: () => import('./pages/chart/chart.component').then(m => m.ChartComponent) },
];