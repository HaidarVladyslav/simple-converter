import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  apiKey = '72a050ae73-68cdebcdc9-rbzbjk';
  toUAH = 'UAH';

  constructor(private http: HttpClient) { }

  // Service that return elementary query
  getCurrencies(from: string) {
    return this.http.get(`https://api.fastforex.io/fetch-one?from=${from}&to=${this.toUAH}&api_key=${this.apiKey}`);
  };
}
