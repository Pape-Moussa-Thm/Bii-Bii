import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { IdServiceService } from 'src/app/services/other-fonctionnality-service/id-service.service';
import { SharedBoolService } from 'src/app/services/other-fonctionnality-service/shared-bool.service';

@Component({
  selector: '.app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {

  countdown: number = 3;
  countdownTimer: any;
  articleToDelete: number | null = null;
  isConfirming: boolean = false;
  articlefo !: Article ;

  @Input() articles: Article[] = [];
  @Input() article!: Article;
  @Output() delete = new EventEmitter;
  @Output() updated = new EventEmitter;

  constructor(private sharedService: SharedBoolService, private idService: IdServiceService) {
  }

  deleteArt(article: Article) {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }

    if (this.isConfirming && this.articleToDelete === article.id) {
      this.isConfirming = false;
      this.articleToDelete = null;
      this.countdown = 3;
      this.delete.emit(article.id);
      
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

  update(article: Article) {
    this.sharedService.setEditMode(true);
    this.idService.setId(article.id);

    const data = {
      "libelle": article.libelle,
      "prix": article.prix,
      "stock": article.stock,
      "categorie": article.categorie_libelle,
      "fournisseurs": article.fournisseurs,
      "photo": article.photo
    }
    this.updated.emit(data);

  }


}
