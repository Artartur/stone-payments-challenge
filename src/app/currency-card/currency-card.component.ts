import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrl: './currency-card.component.scss',
})
export class CurrencyCardComponent implements OnInit {
  inputDollar: number;
  inputTax: number;
  iof: number = 0.011;
  option: string = '';
  data: any = {};
  dollarValue: number;

  ngOnInit(): void {
    this.getDollarValue();
  }

  constructor(private apiService: ApiService) {}

  calculate(dollarValue: number) {
    const dollarConvertedToNumber = Number(dollarValue);
    const dollarPercent = (this.inputTax / 100) * this.inputDollar;
    const taxedDollarCard = (
      dollarConvertedToNumber +
      this.iof * dollarConvertedToNumber
    ).toFixed(2);

    if (this.option === 'money') {
      return console.log(
        Number(
          (this.inputDollar + dollarPercent) * Number(taxedDollarCard)
        ).toFixed(2)
      );
    }
  }

  getDollarValue() {
    this.apiService.getData().subscribe((data) => {
      return console.log(this.calculate(data?.USDBRL?.high));
    });
  }
}
