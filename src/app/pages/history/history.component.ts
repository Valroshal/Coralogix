import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { CommonModule, NgFor } from '@angular/common';
import { ConversionHistoryEntry } from '../../models/converter.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})

export class HistoryComponent implements OnInit {
  history: ConversionHistoryEntry[] = [];

  constructor(private exchangeService: ExchangeRateService) {}

  ngOnInit(): void {
    this.history = this.exchangeService.getHistory();
  }
}
