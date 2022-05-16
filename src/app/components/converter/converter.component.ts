import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {

  convertCurOptions = [
    { option: 'UAH' },
    { option: 'EUR' },
    { option: 'USD' },
    { option: 'GBP' },
  ];

  selectedFirst = 'USD';
  selectedSecond = 'UAH';
  firstValue: number = 0;
  secondValue: number = 0;

  firstExchangeSub!: Subscription;
  secondExchangeSub!: Subscription;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void { }

  // Functions that interact with select changes
  onFirstSelectChange(event: HTMLSelectElement) {
    this.selectedFirst = String(event);
    this.exchangeFromSecondField();
  };

  onSecondSelectChange(event: HTMLSelectElement) {
    this.selectedSecond = String(event);
    this.exchangeFromFirstField();
  };

  // Functions that interact with input changes
  changeFirstValueInput(event: Event) {
    let value = +(event.target as HTMLInputElement).value;
    this.firstValue = value;
    this.exchangeFromFirstField();
  };

  changeSecondValueInput(event: Event) {
    let value = +(event.target as HTMLInputElement).value;
    this.secondValue = value;
    this.exchangeFromSecondField();
  };

  // Functions that changing values for correct output
  exchangeFromFirstField() {
    this.firstExchangeSub = this.currencyService.exchangeValue(this.selectedFirst, this.selectedSecond)
      .subscribe((data: any) => {
        this.secondValue = +(data.result[this.selectedSecond] * this.firstValue);
      });
  };

  exchangeFromSecondField() {
    this.secondExchangeSub = this.currencyService.exchangeValue(this.selectedSecond, this.selectedFirst)
      .subscribe((data: any) => {
        this.firstValue = +(data.result[this.selectedFirst] * this.secondValue);
      });
  };

  // Function that checks if a value is correct as I possible could expect
  checkForNulish(event: Event) {
    let value = (event.target as HTMLInputElement).value;

    if(+value < 0) {
      (event.target as HTMLInputElement).value = '0';
    }

    if (value.length > 1 && value[1] === '0' && value[0] === '0') {
      (event.target as HTMLInputElement).value = '0';
    }

    if (value.length > 1 && value[0] === '0') {
      if(value.indexOf('.') > -1 || value.indexOf(',') > -1) {
        return;
      }
      (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value.slice(1);
    }
  };

  ngOnDestroy(): void {
    this.firstExchangeSub.unsubscribe();
    this.secondExchangeSub.unsubscribe();
  };

}
