import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RainfallService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(): Observable<any> {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=decdaced4749419e8dd162907240107&q=Pune'
    return this.http.get(url);
  }
}
