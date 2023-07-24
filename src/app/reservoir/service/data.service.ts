import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type Reservoir = {
  majorDimension: string;
  range: string;
  values: Array<Array<string>>
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getWaterData(): Observable<Reservoir> {
    const url = 'https://sheets.googleapis.com/v4/spreadsheets/1Nxi7VIsUgxAy1c70o-NQXE9EdQLRZ5N-jA39LUmpEIk/values/Sheet1?key=AIzaSyBbit_Rj0y2JHeugpwFX-K9Yw5i-pPFZT0'
    return this.http.get<Reservoir>(url);
  }
}
