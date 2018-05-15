import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// TEMP
import { HeroListService } from '../hero-list/hero-list.service';

@Injectable()
export class HeroFormService {

  constructor(private http: HttpClient, private listService: HeroListService) {}

  public postHero(hero): Observable<any> { // can use this for both new and edit because unique emails are used as the key for data
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post(`${environment.api_url}/hero`, hero, httpOptions);
  }
}
