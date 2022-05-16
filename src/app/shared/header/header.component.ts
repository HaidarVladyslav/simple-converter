import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  euSymb = 'EUR';
  dolSymb = 'USD';

  dolCur!: number;
  eurCur!: number;

  getDolSub!: Subscription;
  getEurSub!: Subscription;

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.getDol(this.dolSymb);
    this.getEur(this.euSymb);
  };

  // Function that return currently value of Dollar to UAH
  getDol(from: string) {
    this.getDolSub = this.headerService.getCurrencies(from)
      .subscribe({
        next: (data: any) => this.dolCur = data.result['UAH'],
        error: er => console.error(er),
        complete: () => console.warn('Successfully exchange procedure.')
      });
  };

  // Function that return currently value of Euro to UAH
  getEur(from: string) {
    this.getEurSub = this.headerService.getCurrencies(from)
      .subscribe({
        next: (data: any) => this.eurCur = data.result['UAH'],
        error: er => console.error(er),
        complete: () => console.warn('Successfully exchange procedure.')
      });
  };

  ngOnDestroy(): void {
    this.getDolSub.unsubscribe();
    this.getEurSub.unsubscribe();
  };

}
