// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CurrencyRateService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {
  private apiUrl = 'https://open.er-api.com/v6/latest/UAH';

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}