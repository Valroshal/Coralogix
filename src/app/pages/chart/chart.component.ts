import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { Currencies, WeeklyRates } from '../../models/converter.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  imports: [FormsModule, BaseChartDirective, CommonModule],
})
export class ChartComponent implements OnInit {
  currencies: string[] = [];
  baseCurrency: string = 'USD';
  targetCurrency: string = 'EUR';

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Exchange Rate Trends',
        data: [],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Currency Exchange Rate Trends',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Dates',
        },
      },
      y: {
        grid: {
          color: '#e5e5e5',
        },
        title: {
          display: true,
          text: 'Exchange Rate',
        },
      },
    },
  };

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.getCurrencies();
    this.fetchTrends();
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

  fetchTrends(): void {
    if (!this.baseCurrency || !this.targetCurrency) {
      alert('Please select both base and target currencies.');
      return;
    }

    const baseCurrency = this.baseCurrency;
    const targetCurrency = this.targetCurrency;
  
    this.exchangeRateService.getWeeklyRates(baseCurrency).subscribe((data: WeeklyRates) => {
      const labels = Object.keys(data.rates);
      const rates = labels.map((date) => data.rates[date][targetCurrency]);
  
      this.chartData = {
        ...this.chartData,
        labels: labels.reverse(),
        datasets: [
          {
            ...this.chartData.datasets[0],
            data: rates.reverse(),
          },
        ],
      };
    });
  }
  

  onCurrencyChange(): void {
    this.fetchTrends();
  }
}
