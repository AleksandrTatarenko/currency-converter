import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyRateService } from '../currency-rate.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  currencyConverterForm!: FormGroup;
  convertedAmount: number = 0;
  exchangeRates: any = {};

  constructor(private fb: FormBuilder, private currencyRateService: CurrencyRateService) {}

  ngOnInit() {
    this.initForm();
    this.loadExchangeRates();
  }

  initForm() {
    this.currencyConverterForm = this.fb.group({
      amount1: [null, Validators.required],
      amount2: [null, Validators.required],
      selectedCurrency1: ['UAH', Validators.required],
      selectedCurrency2: ['USD', Validators.required]
    });
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

  convertCurrency(direction: number) {
    const selectedCurrency1 = this.currencyConverterForm.get('selectedCurrency1')!.value;
    const selectedCurrency2 = this.currencyConverterForm.get('selectedCurrency2')!.value;
    const rate1 = this.exchangeRates[selectedCurrency1] || 1;
    const rate2 = this.exchangeRates[selectedCurrency2] || 1;
    if (direction === 1) {
      const amount1 = this.currencyConverterForm.get('amount1')!.value;
      this.convertedAmount = (amount1 / rate1) * rate2;
      this.currencyConverterForm.patchValue({ amount2: this.convertedAmount.toFixed(2) });
    } else if (direction === 2) {
      const amount2 = this.currencyConverterForm.get('amount2')!.value;
      this.convertedAmount = (amount2 / rate2) * rate1;
      this.currencyConverterForm.patchValue({ amount1: this.convertedAmount.toFixed(2) });
    }
  }
}

