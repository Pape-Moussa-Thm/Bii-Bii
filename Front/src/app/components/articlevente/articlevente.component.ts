import { Component, Input, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ArtVenteServiceService } from 'src/app/services/artVente-service/art-vente-service.service';
import { ArticleVente } from '../../interfaces/article-vente';
import { Categorie, Link } from '../../interfaces/paginated-categorie.interface';
import { Fournisseur } from '../../interfaces/fournisseur';
import { FormmComponent } from 'src/app/components/articlevente/formm/formm.component';
import { ItemsComponent } from 'src/app/components/articlevente/lister/items/items.component';
import { IdServiceService } from 'src/app/services/other-fonctionnality-service/id-service.service';
import { BehaviorSubject } from 'rxjs';
import { ArticleService } from 'src/app/services/article-service/article.service';
import { Article } from 'src/app/interfaces/article';
import { SharedBoolService } from 'src/app/services/other-fonctionnality-service/shared-bool.service';
 

@Component({
  selector: 'app-articlevente',
  templateUrl: './articlevente.component.html',
  styleUrls: ['./articlevente.component.css']
})
export class ArticleventeComponent {

  @Input() articles: ArticleVente[] = [];
  @Input() art: ArticleVente[] = [];
  @Input() categories: Categorie[] = [];
  @Input() artConfect: Article[] = [];
  @Input() prix!: number;
  links: Link[] = [];


  @ViewChild(FormmComponent) formmComponent!: FormmComponent;
  @ViewChildren(ItemsComponent) itemsComponent!: ItemsComponent;

  constructor(private fb: FormBuilder, private articlevente: ArtVenteServiceService, private articleService: ArticleService, private sharedService: SharedBoolService){}

  ngOnInit() {
    this.getData();
  }

  toPaginate(url: string) {
    if (url) {
      this.articlevente.index(url).subscribe((res) => {
        this.articles = res.data.articles;
        this.links = res.data.link;
        
      });
    }else{
      this.sharedService.setEditMode(true);
    }
  }

  getData() {
    this.articlevente.index().subscribe(
      res => {
        this.articles = res.data.articles;
        this.links = res.data.link;
        this.art = res.data.art;
        // console.log(this.art);
      }
    )
    this.articleService.getCatAndFour().subscribe(
      res => {
        this.categories = res.data.catVente;        
      }
    )
    this.articleService.index().subscribe(
      res => {
        this.artConfect = res.data.articles;
        // console.log(this.artConfect);
        
      }
    )
    
  }

  addArticle(article: ArticleVente) {
    this.articlevente.store(article).subscribe(
      res => {
        console.log(res);
        this.getData()
      }
    )
  }

  supArt(id: number) {
    this.articlevente.delete(id).subscribe(res => {
      console.log(res);
      this.getData()
    })
  }

  editArticle(article: ArticleVente) {
    const artConf = this.formmComponent.articlesConfection;
    artConf.clear();
    const Art = article.articlesConfection;
    Art.forEach((art:Article) => {
      // console.log(art.libelle);
      // console.log(art.pivot?.qte);

      const newArtConf=this.fb.group({
        lib: art.libelle,
        qte: art.pivot?.qte
      });

      artConf.push(newArtConf);
      
    });

    if (this.formmComponent) {
      this.formmComponent.artVenteForm.patchValue({
        libelle: article.libelle,
        categorie: article.categorie,
        promo: article.promo,
        valeur: article.valeur,
        reference: article.ref,
        cout: article.cout,
        marge: article.marge,
        prix_vente: article.prix_vente
      });
    }
    this.formmComponent.img = `http://localhost:8000/storage/${article.photo}`;

  }

  updated(article: ArticleVente) {
    this.articlevente.update(article, article.id).subscribe(
      res => {
        console.log(res)
        this.getData()
      });
    // console.log(article);
  }
}

