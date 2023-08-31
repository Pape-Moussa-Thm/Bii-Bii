import { Component, Input, ViewChild, ViewChildren } from '@angular/core';
import { ArticleService } from '../../services/article-service/article.service'; 
import { Article } from '../../interfaces/article';
import { Categorie } from '../../interfaces/paginated-categorie.interface';
import { Fournisseur } from '../../interfaces/fournisseur';
import { FormComponent } from './form/form.component';
import { ItemComponent } from './list/item/item.component';
import { IdServiceService } from 'src/app/services/other-fonctionnality-service/id-service.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent {

id: number | null = null;

@Input() articles: Article[]=[];
// @Input() article!: Article;
@Input() editedArticle!: Article;
@Input() categories: Categorie[]=[];
@Input() fournisseurs: Fournisseur[]=[];
@ViewChild(FormComponent) formComponent!: FormComponent;
@ViewChildren(ItemComponent) itemComponent!: ItemComponent;

  constructor(private articleService: ArticleService) {}
  
  ngOnInit(){
    this.getData();
  }
  
  getData(){
    this.articleService.index().subscribe(
      res => {
        this.articles = res.data.articles;
        // console.log(this.articles);
      }
    )
    this.articleService.getCatAndFour().subscribe(
      res=>{
        this.categories = res.data.categories;
        this.fournisseurs = res.data.fournisseurs;
      }
    )
  }

  addArticle(article: Article){
    this.articleService.store(article).subscribe(
      res=>{
        console.log(res);
        this.getData()
      }
    )
  }

  supArt(id:number){
    this.articleService.delete(id).subscribe(res=>{
    console.log(res);
    this.getData()
    })
  }

  updateArt(article: Article){
    this.articleService.update(article, article.id).subscribe(
      res=>
      { console.log(res)
        this.getData()
      });
  }

  editArticle(article: Article) {
    const fournisseursArray = article.fournisseurs.map(fournisseur => fournisseur.nomComplet);
    const fournisseursString = fournisseursArray.join(', '); 
    this.formComponent.selectedFournisseurs = fournisseursArray;
    
    if (this.formComponent) {
        this.formComponent.articleForm.patchValue({
        libelle: article.libelle,
        prix: article.prix,
        stock: article.stock,
        categorie: article.categorie,
        fournisseurs: fournisseursString,
        photo: article.photo
      });
    }
    this.formComponent.img = `http://localhost:8000/storage/${article.photo}`;

  }


}

