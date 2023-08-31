import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Link } from 'src/app/interfaces/paginated-categorie.interface';
import { SharedBoolService } from 'src/app/services/other-fonctionnality-service/shared-bool.service';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent {

  @Input() links: Link[] = [];
  @Output() url = new EventEmitter();
  isEditing: boolean = false;

  // constructor(private sharedService: SharedBoolService)
  // {
  //   this.sharedService.editModeChanged.subscribe((isEditing: boolean) => {
  //     this.isEditing = isEditing;
  //   });
  // }
  

  goToPage(url: string){
    this.url.emit(url);

  }

}

