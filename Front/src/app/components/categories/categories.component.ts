import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie-service/categorie.service';
import { PaginatedCategorie, Categorie, Link } from 'src/app/interfaces/paginated-categorie.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Categorie[] = [];
  paginationLinks: Link[] = [];
  currentPage: number = 1;
  paginationData: PaginatedCategorie | null = null;
  libelle: string = '';
  id: number | undefined;
  button: boolean = false;
  selectAll: boolean = false;
  modifiedCategories: Categorie[] = [];
  isAddMode: boolean = false;
  isSwitchChecked: boolean = false;
  successMessage: string = '';
  delete: boolean = false;
  none: boolean = true;
  oneShot: boolean = false;
  twoShot: boolean = false;
  selectedCategories: Categorie[] = [];
  selectedCategoryIds: number[] = [];

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.loadCategories(this.currentPage);
    this.button=true;
    this.delete=true;
    this.none = true;
  }
  
  toggleSelectAll(): void {
    if(this.selectAll){
      this.categories.forEach(categorie => (categorie.checked = this.selectAll));
      this.delete=false;
    }else{
      this.categories.forEach(categorie => (categorie.checked = false));
      this.delete=true;
    }
  }

  hop(){
    if(this.isAddMode){
      this.twoShot = true;
    }
  }

  decheck(){
    if(this.isAddMode){
      this.none = false;
      this.button=true;
      this.twoShot=true;
    }else{
      this.twoShot=false;
      this.button=true;
      this.selectAll=false;
      this.oneShot = false;
      this.categories.forEach(categorie => (categorie.checked = this.selectAll));
      this.none = true;
      this.delete = true;
    }
    
  }

  deplacer(categorie:Categorie, id?:number){
    if (this.isAddMode) {
      this.twoShot=false;
      this.libelle=categorie.libelle
      this.id=categorie.id
    }
  }

  // markAsModified(categorie: Categorie): void {
  //   if (!this.modifiedCategories.includes(categorie)) {
  //       this.modifiedCategories.push(categorie);
  //   };
  // }

  // processModifiedCategories(): void {
  //     this.categorieService.updateCategorie(this.modifiedCategories).subscribe(response=>{
  //       console.log(response)
  //     });
  // }

  onInputChange() {
    if (this.libelle.length >= 3) {
      this.categorieService.searchCategorie(this.libelle).subscribe(response => {
        if (response.message === 'true') {
          this.button = true;
        } else {
          this.button = false;
        }
      });
    }
    return this.libelle.length >= 3 ? this.button=false : this.button=true;
    
  }

  addOrEditCategorie(): void {
    if (this.isAddMode) {
      this.editerCategorie();
    } else {
      this.ajouterCategorie();
    }
  }

  ajouterCategorie(){
    if (this.libelle.trim() !== '') {
      this.categorieService.creerCategorie(this.libelle).subscribe(response => {
        alert(response.message);
        this.loadCategories(this.currentPage);
        this.libelle = '';
      });
    }
  }

  editerCategorie(){
    const cat = [{'libelle': this.libelle, 'id': this.id}]
    // console.log(cat);
    this.categorieService.updateCategorie(cat).subscribe(response=>{
      alert(response.message);
      this.loadCategories(this.currentPage);
      this.libelle=''
    }); 
  }

  deleteSelectedCategories(): void {
    this.selectedCategories = this.categories.filter(categorie => categorie.checked);
    // console.log(this.selectedCategories);
    
    this.selectedCategoryIds = this.selectedCategories.map(categorie => categorie.id) as number[];;

    if (this.selectedCategoryIds.length > 0) {
      this.categorieService.deleteSelectedCategories(this.selectedCategoryIds).subscribe(response => {
        alert(response.message);
        this.loadCategories(this.currentPage);
      });
    } else {
      console.log('Aucune catégorie sélectionnée pour la suppression.');
    }
  }
  
  oneCheck(){
   const ver = this.categories.filter(cat => cat.checked)
   if (ver.length > 0) {
    this.delete=false
   }else{
    this.delete=true
   }
   const test = this.categories.filter(cat => !cat.checked) 
   if(test){
    this.selectAll=false;
   }
    const hey = this.categories.length
    if (ver.length == hey) {
      this.selectAll = true;      
    }
    
    
    // if (ver.length = hey) {
    //   this.selectAll = true
    // }
  }

  loadCategories(page: number): void {
    this.categorieService.getCategories(page)
      .subscribe((response: PaginatedCategorie) => {
        // console.log(response);
        this.categories = response.data;
        this.currentPage = response.current_page;
        this.paginationData = response;

        this.paginationLinks = this.paginationData.links.map(link => {
          if (link.label === "&laquo; Previous") {
            link.label = "Previous";
          } else if (link.label === "Next &raquo;") {
            link.label = "Next";
          }
          return link;
        });
      });
      this.selectAll=false;
  }

  goToPage(page: number): void {
    this.loadCategories(+page);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.loadCategories(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.paginationData && this.currentPage < this.paginationData.last_page) {
      this.loadCategories(this.currentPage + 1);
    }
  }

  handlePaginationLinkClick(link: Link): void {
    if (link.label === "Previous") {
      this.goToPreviousPage();
    } else if (link.label === "Next") {
      this.goToNextPage();
    } else {
      this.goToPage(+link.label);
    }
  }

}
