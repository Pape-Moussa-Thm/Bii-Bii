import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleVente } from 'src/app/interfaces/article-vente';
import { Link } from 'src/app/interfaces/paginated-categorie.interface';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.css']
})
export class ListerComponent {

  @Input() articles: ArticleVente[] = [];
  @Output() idToDel = new EventEmitter;
  @Output() toForm = new EventEmitter;
  @Output() urll = new EventEmitter;

  @Input() links : Link[] = [];

  @Input() art!: ArticleVente;

url(url: string) {

this.urll.emit(url);

}
  deleting(id: number) {
    this.idToDel.emit(id);

  }
  
  update(article: Article) {
    this.toForm.emit(article);
    //console.log(article);
    
  }


}
