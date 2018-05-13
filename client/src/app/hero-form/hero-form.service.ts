import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeroFormService {

  constructor(private http: HttpClient) {}

  private setHeaders(params?): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'my-auth-token'
    };
    const headerOptions = new HttpHeaders(headersConfig);
    return headerOptions;
  }

  public test(): Observable<any> {
    return this.http.get(`${environment.api_url}/test`);
  }

  public postHero(hero): Observable<any> {
    const headers = {
      headers: this.setHeaders()
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    console.log(hero, headers, httpOptions);
    return this.http.post(`${environment.api_url}/hero`, hero, httpOptions);
  }
}
