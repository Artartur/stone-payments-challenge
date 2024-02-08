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
  iofCard: number = 0.064;
  iofMoney: number = 0.011;
  option: string = '';
  taxedDollar: number;
  total: number = 0;

  ngOnInit(): void {}

  constructor(private apiService: ApiService, private router: Router) {}
  calculate() {
    this.apiService.getData().subscribe((data) => {
      const dollarConvertedToNumber = Number(data?.USDBRL?.high);
      const dollarPercent = (this.inputTaxValue / 100) * this.inputDollarValue;

      if (this.option === 'dinheiro') {
        this.taxedDollar =
          dollarConvertedToNumber + this.iofMoney * dollarConvertedToNumber;
      } else if (this.option === 'cartão') {
        this.taxedDollar =
          dollarConvertedToNumber + this.iofCard * dollarConvertedToNumber;
      }

      this.total = (this.inputDollarValue + dollarPercent) * this.taxedDollar;
      this.dollarValue = Number(dollarConvertedToNumber.toFixed(2));
      this.navigateToResult();
    });
  }

  convertToLocaleString(value: number) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  navigateToResult() {
    this.router.navigate(['/result'], {
      queryParams: {
        dollar: this.convertToLocaleString(this.dollarValue),
        iof:
          this.option === 'dinheiro'
            ? (this.iofMoney * 100).toFixed(1)
            : this.convertToLocaleString(this.iofCard * 100),
        option: this.option,
        tax: this.convertToLocaleString(this.inputTaxValue),
        total: this.convertToLocaleString(this.total),
      },
    });
  }
}
