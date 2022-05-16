import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiKey = '72a050ae73-68cdebcdc9-rbzbjk';
  constructor(private http: HttpClient) { }

  // Service that return coefficients of elementary query
  exchangeValue(from: string, to: string) {
    return this.http.get(`https://api.fastforex.io/fetch-one?from=${from}&to=${to}&api_key=${this.apiKey}`);
  };

}
