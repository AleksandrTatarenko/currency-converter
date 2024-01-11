import { Component, OnInit } from '@angular/core';
import { CurrencyRateService } from '../currency-rate.service';

@Component({
  selector: 'app-currency-header',
  templateUrl: './currency-header.component.html',
  styleUrls: ['./currency-header.component.css']
})
export class CurrencyHeaderComponent implements OnInit {
  exchangeRates: any = {};

  constructor(private currencyRateService: CurrencyRateService) {}

  ngOnInit() {
    this.loadExchangeRates();
  }

  loadExchangeRates() {
    this.currencyRateService.getExchangeRates().subscribe(
      (data) => {
        this.exchangeRates = data.rates;
      },
      (error) => {
        console.error('Failed to load exchange rates:', error);
      }
    );
  }
}