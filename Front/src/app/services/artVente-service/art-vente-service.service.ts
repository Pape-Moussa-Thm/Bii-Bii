import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environnements/environnement';
import { MainService } from '../main/main.service';
import { Article } from '../../interfaces/article';
import { Observable } from 'rxjs';
import { ArticleVente } from 'src/app/interfaces/article-vente';


@Injectable({
  providedIn: 'root'
})
export class ArtVenteServiceService extends MainService<ArticleVente>{

  override apiUrl = environment.apiUrl + '/artVente';

  constructor(http: HttpClient, private breukh: HttpClient) {
    super(http);
  }

  searchPrix(art: string): Observable<number> {
    return this.breukh.get<number>(`http://127.0.0.1:8000/api/articles/search/${art}`);
  }
  
  
}
