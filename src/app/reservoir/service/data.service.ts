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

  getWaterData(): Observable<any> {
    const url = 'https://punefloodcontrol.com/api/bhimawater.php?id=2023-08-02'
    return this.http.get<any>(url);
  }
}
