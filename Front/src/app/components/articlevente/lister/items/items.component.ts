import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleVente } from 'src/app/interfaces/article-vente';
import { IdServiceService } from 'src/app/services/other-fonctionnality-service/id-service.service';
import { SharedBoolService } from 'src/app/services/other-fonctionnality-service/shared-bool.service';

@Component({
  selector: '.app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  @Input() art!: ArticleVente;

  @Output() del = new EventEmitter;
  @Output() updated = new EventEmitter;


  countdown: number = 3;
  countdownTimer: any;
  articleToDelete: number | null = null;
  isConfirming: boolean = false;


  constructor(private idService: IdServiceService, private sharedService: SharedBoolService) {
  }


  deleteArt(article: ArticleVente) {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }

    if (this.isConfirming && this.articleToDelete === article.id) {
      this.isConfirming = false;
      this.articleToDelete = null;
      this.countdown = 3;
      this.del.emit(article.id);

    } else {
      this.articleToDelete = article.id;
      this.isConfirming = true;

      this.countdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(this.countdownTimer);
          this.isConfirming = false;
          this.articleToDelete = null;
          this.countdown = 3;
        }
      }, 1000);
    }
  }

  update(article: ArticleVente) {
    this.sharedService.setEditMode(true);
    this.idService.setId(article.id);

    const data = {
      "libelle": article.libelle,
      "categorie": article.categorie_libelle,
      "promo": article.promo,
      "valeur": article.valeur,
      "articlesConfection": article.article,
      "photo": article.photo,
      "reference": article.ref,
      "cout": article.cout,
      "marge": article.marge,
      "prix_vente": article.prix_vente

    }
    this.updated.emit(data);
    //console.log(data);
    

  }



}
