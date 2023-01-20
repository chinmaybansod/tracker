import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stateResponse } from './response.model';

@Injectable({
  providedIn: 'root'
})
export class CoWinService {

  constructor(private _http: HttpClient) { }

  getAllStates() {
    const url = 'https://data.covid19india.org/v4/min/timeseries.min.json'
    return this._http.get<stateResponse>(url)
  }
}
