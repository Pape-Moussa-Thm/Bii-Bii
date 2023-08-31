import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export abstract class MainService<T> {

  apiUrl!: string;

  constructor(private http: HttpClient) { }

  store(item: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}`, item);
  }

  index(url: string=this.apiUrl): Observable<any> {
    return this.http.get<T[]>(url);
  }

  getCatAndFour(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/catfour`);
  }

  update(item: T, id: number|null): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number|null): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
