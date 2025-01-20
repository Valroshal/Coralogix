import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { Conversion, ConversionHistoryEntry, Currencies, ExchangeRateResponse, Rates, WeeklyRates } from '../models/converter.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = 'https://api.frankfurter.app'; // Base URL for the exchange rates API
  private history: ConversionHistoryEntry[] = [];

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<Currencies> {
    return this.http.get<Currencies>(`${this.apiUrl}/currencies`).pipe(
      catchError(this.handleError('getCurrencies'))
    );
  }

  convert(from: string, to: string, amount: number): Observable<Conversion> {
    return this.http.get<Conversion>(`${this.apiUrl}/latest?amount=${amount}&from=${from}&to=${to}`).pipe(
      catchError(this.handleError('convert'))
    );
  }

  getHistory(): ConversionHistoryEntry[] {
    try {
      const savedHistory = localStorage.getItem('history');
      if (!savedHistory) {
        return []
      }
      this.history = savedHistory && JSON.parse(savedHistory);
      return this.history;
    } catch (error) {
      console.error('Error retrieving history from localStorage:', error);
      return []
    }
    
  }

  addToHistory(data: ConversionHistoryEntry): void {
    try {
      this.history.push(data);
      localStorage.setItem('history', JSON.stringify(this.history));
    } catch (error) {
      console.error('Error saving history to localStorage:', error);
    }
  }

  getWeeklyRates(base: string): Observable<WeeklyRates> {
    const today = new Date();
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().split('T')[0];
    });

    const requests: Observable<ExchangeRateResponse>[] = dates.map((date) =>
      this.http.get<ExchangeRateResponse>(`${this.apiUrl}/${date}?base=${base}`)
    );

    return forkJoin(requests).pipe(
      map((responses) => {
        const rates: Record<string, Rates> = {};
        responses.forEach((response, i) => {
          rates[dates[i]] = response.rates;
        });
        return { rates };
      }),
      catchError(this.handleError('getWeeklyRates'))
    );
  }

  private handleError(operation: string) {
    return (error: any): Observable<never> => {
      console.error(`${operation} failed:`, error);
      return throwError(() => new Error(`Failed to perform ${operation}. Please try again later.`));
    };
  }
}

