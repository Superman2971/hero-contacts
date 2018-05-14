import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HeroListService {
  public database: Array<any> = [];
  public listChanges: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  public listChange() {
    this.listChanges.next(this.database);
  }

  private setHeaders(params?): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'my-auth-token'
    };
    const headerOptions = new HttpHeaders(headersConfig);
    return headerOptions;
  }

  public getDatabase(): Observable<any> {
    const headers = {
      headers: this.setHeaders()
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.get(`${environment.api_url}/heroes`);
  }
}
