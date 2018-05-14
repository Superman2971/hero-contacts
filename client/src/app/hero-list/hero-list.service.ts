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

  public getDatabase(): Observable<any> {
    return this.http.get(`${environment.api_url}/heroes`);
  }

  public deleteHero(email): Observable<any> {
    return this.http.delete(`${environment.api_url}/hero/${email}`);
  }
}
