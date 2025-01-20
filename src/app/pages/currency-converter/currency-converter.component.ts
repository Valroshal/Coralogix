import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conversion, Currencies } from '../../models/converter.model';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit{
  amount: number | null = null;
  fromCurrency: string | null = null;
  toCurrency: string | null = null;
  currencies: string[] = [];
  result: number | null = null;

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies(): void {
    this.exchangeRateService
      .getCurrencies()
      .pipe(
        tap((data: Currencies) => {
          this.currencies = Object.keys(data);
        }),
        catchError((error) => {
          console.error('Error fetching currencies:', error);
          alert('Unable to fetch the list of currencies. Please try again later.');
          return EMPTY;
        })
      )
      .subscribe();
  }

  onFieldChange(): void {
    this.result = null;
  }

  convertCurrency(): void {
    if (!this.amount || !this.fromCurrency || !this.toCurrency) {
      return;
    }

    const amount = this.amount;
    const fromCurrency = this.fromCurrency;
    const toCurrency = this.toCurrency;

    this.exchangeRateService
      .convert(fromCurrency, toCurrency, amount)
      .pipe(
        tap((data: Conversion) => {
          const result = data.rates[toCurrency];
          if (!result) {
            throw new Error('Conversion result is null or undefined.');
          }

          // Save the conversion to history
          this.exchangeRateService.addToHistory({
            amount: amount,
            from: fromCurrency,
            to: toCurrency,
            result: result,
          });

          this.result = result;
        }),
        catchError((error) => {
          console.error('Error fetching conversion rate:', error);
          alert('Unable to fetch conversion rate. Please try again later.');
          return EMPTY;
        })
      )
      .subscribe();
  }
}
