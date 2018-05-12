import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeroFormService {

  constructor(private http: HttpClient) {}

  public test(): Observable<any> {
    return this.http.get(`${environment.api_url}/test`);
  }
}
