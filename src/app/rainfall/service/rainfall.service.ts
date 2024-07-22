import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RainfallService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(): Observable<any> {
    const url = 'https://weather-api-server-bnsn.onrender.com/getWeatherStatus/'
    return this.http.get(url);
  }
}
