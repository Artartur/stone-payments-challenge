import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

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
  iof: number = 0.011;
  iofCard: number = 0.064;
  option: string = '';
  shouldCalculateTotal: boolean = false;
  total: string = '';
  ngOnInit(): void {
    this.getDollarValue();
  }

  constructor(private apiService: ApiService) {}

  calculate(dollarValue: number) {
    const dollarConvertedToNumber = Number(dollarValue);

    const dollarPercent = (this.inputTaxValue / 100) * this.inputDollarValue;

    const taxedDollarMoney = (
      dollarConvertedToNumber +
      this.iof * dollarConvertedToNumber
    ).toFixed(2);

    const taxedDollarCard = (
      dollarConvertedToNumber +
      this.iofCard * dollarConvertedToNumber
    ).toFixed(2);

    if (this.option === 'money') {
      this.shouldCalculateTotal = !this.shouldCalculateTotal;
      return (this.total = Number(
        (this.inputDollarValue + dollarPercent) * Number(taxedDollarMoney)
      ).toFixed(2));
    }

    if (this.option === 'card') {
      this.shouldCalculateTotal = !this.shouldCalculateTotal;
      return (this.total = Number(
        (this.inputDollarValue + dollarPercent) * Number(taxedDollarCard)
      ).toFixed(2));
    }

    return this.total;
  }

  getDollarValue() {
    this.apiService
      .getData()
      .subscribe((data) => this.calculate(data?.USDBRL?.high));
  }

  getTotal() {
    return this.total;
  }
}
