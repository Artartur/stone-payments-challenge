import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://economia.awesomeapi.com.br/last/USD-BRL'
  
  constructor(private httpClient: HttpClient) {}

  getData(): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl);
  }
}
