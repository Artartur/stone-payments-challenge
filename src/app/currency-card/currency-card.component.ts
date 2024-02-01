import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrl: './currency-card.component.scss',
})
export class CurrencyCardComponent implements OnInit {
  data: any = {};
  dollarValue: number;
  inputDollarValue: number;
  inputTaxValue: number;
  option: string = '';
  taxedDollar: number;
  total: number = 0;

  ngOnInit(): void {}

  constructor(private apiService: ApiService, private router: Router) {}
  calculate() {
    this.apiService.getData().subscribe((data) => {
      const dollarConvertedToNumber = Number(data?.USDBRL?.high);
      const dollarPercent = (this.inputTaxValue / 100) * this.inputDollarValue;

      if (this.option === 'money') {
        this.taxedDollar =
          dollarConvertedToNumber + 0.011 * dollarConvertedToNumber;
      } else if (this.option === 'card') {
        this.taxedDollar =
          dollarConvertedToNumber + 0.064 * dollarConvertedToNumber;
      }

      this.total = (this.inputDollarValue + dollarPercent) * this.taxedDollar;
      this.dollarValue = Number(dollarConvertedToNumber.toFixed(2));
      this.navigateToResult();
    });
  }

  navigateToResult() {
    this.router.navigate(['/result'], {
      queryParams: {
        dollar: this.dollarValue,
        tax: this.inputTaxValue,
        total: this.total.toFixed(2),
      },
    });
  }
}
