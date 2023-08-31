import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { IdServiceService } from 'src/app/services/other-fonctionnality-service/id-service.service';
import { SharedBoolService } from 'src/app/services/other-fonctionnality-service/shared-bool.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

countdown: number = 3;
countdownTimer: any; 
articleToDelete: number | null = null;
isConfirming: boolean = false;
page: number = 1;
count: number = 0;
tableSize: number = 2;
tableSizes: number[] = [];


  @Output() updated = new EventEmitter;
  @Output() idToDel = new EventEmitter;
  @Output() toForm = new EventEmitter;
  @Input() articles: Article[] = [];
  @Input() article!: Article;



  onTableDataChange(event: number){
    this.page=event;
  }

  onTableChange(event: any){
    this.tableSizes=event.target.value;
    this.page=1;
  }

  delete(id: number) {
    this.idToDel.emit(id);
    
  }

  update(article: Article){
    this.toForm.emit(article);
  }


}

