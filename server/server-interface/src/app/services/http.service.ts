import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Command } from '../interfaces/command';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  public postCommand(command: Command): Observable<any> {
    return this.http.post(this.url + 'command', command);
  }


}
