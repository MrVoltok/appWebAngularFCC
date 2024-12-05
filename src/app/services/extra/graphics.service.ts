import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { Observable } from 'rxjs';
import { FacadeService } from '../facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

  constructor(
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }

  public countUsers(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/usuarios/total/`, { headers: headers });
  }
}
