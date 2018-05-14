import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// TEMP
import { HeroListService } from '../hero-list/hero-list.service';

@Injectable()
export class HeroFormService {

  constructor(private http: HttpClient, private listService: HeroListService) {}

  private setHeaders(params?): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'my-auth-token'
    };
    const headerOptions = new HttpHeaders(headersConfig);
    return headerOptions;
  }

  public postHero(hero): Observable<any> { // can use this for both new and edit because unique emails are used as the key for data
    const headers = {
      headers: this.setHeaders()
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    console.log('POST', hero);
    return this.http.post(`${environment.api_url}/hero`, hero, httpOptions);
  }
}
