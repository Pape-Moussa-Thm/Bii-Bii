import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedCategorie } from '../../interfaces/paginated-categorie.interface';


@Injectable({
  providedIn: 'root'
})

export class CategorieService {
  private baseUrl: string = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

   getCategories(page: number): Observable<PaginatedCategorie> {
    return this.http.get<PaginatedCategorie>(`${this.baseUrl}/categories?page=${page}`);
  }

  creerCategorie(libelle: string): Observable<any> {
    const categorie = { libelle };
    return this.http.post<any>(`${this.baseUrl}/categories`, categorie);  
  }

  searchCategorie(libelle: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories/${libelle}`);
  }

  deleteSelectedCategories(categoryIds: number[]): Observable<any> {
    const data = { "categories":categoryIds };
    return this.http.post<any>(`${this.baseUrl}/categories/delete`, data);
  }

  updateCategorie(categories: any[]): Observable<any> {
    const data = { categories };
    return this.http.put<any>(`${this.baseUrl}/categories/update`, data);
  }


}

