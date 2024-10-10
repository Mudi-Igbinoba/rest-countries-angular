import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../model/country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private url = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/all`);
  }

  getCountryByName(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/name/${name}`);
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/region/${region}`);
  }

  getCountryDetails(id: string | null): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/name/${id}?fullText=true`);
  }
}
