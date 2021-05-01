import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Filters } from './filters';
import { FiltersStore } from './filters.store';
@Injectable({
  providedIn: 'root'
})

export class FiltersService {

  private apiUrl: string = environment.baseUrl;
  private httpOptions = {
    headers: new HttpHeaders().set('Access-Control-Allow-Origin','*')
  }

  constructor(
      private http: HttpClient,
      private filtersStore: FiltersStore
    ) { }

  getFilters() : Observable<Filters> {
    return this.http.get<Filters>(`${this.apiUrl}/cards/filters`, this.httpOptions).pipe(
        tap((data: Filters) => this.filtersStore.update({...data}))
    );
  }
}
