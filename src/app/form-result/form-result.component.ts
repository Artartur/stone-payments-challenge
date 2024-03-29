import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrl: './form-result.component.scss',
})
export class FormResultComponent implements OnInit {
  dollar: string;
  iof: string;
  option: string;
  tax: string;
  totalValue: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.dollar = params['dollar'];
      this.iof = params['iof'];
      this.option = params['option'];
      this.tax = params['tax'];
      this.totalValue = params['total'];
    });
  }
}
