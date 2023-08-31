import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/interfaces/article';
import { Categorie } from 'src/app/interfaces/paginated-categorie.interface';
import { Fournisseur } from 'src/app/interfaces/fournisseur';
import { ImagesService } from 'src/app/services/image-service/images.service';
import { SharedBoolService } from 'src/app/services/other-fonctionnality-service/shared-bool.service';
import { IdServiceService } from 'src/app/services/other-fonctionnality-service/id-service.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

articleForm: FormGroup
name:string='';
ref: string='';
archive: string='';
img: string = "assets/images/demon_slayer.png";
backgroundImageSelected: any;
tabFournis: Fournisseur[]=[];
selectedCategory: Categorie | null = null;
isEditing: boolean = false;
id: number | null = null;
suggestions: Fournisseur[] = [];
fournisseurCtrl = new FormControl();
selectedFournisseurs: any[]=[];
formErrorMessages: string[] = [];


@Output() addArticleEvent = new EventEmitter<Article>();
@Output() editArticleEvent = new EventEmitter<Article>();
@Input() categories: Categorie[] = [];
@Input() fournisseurs: Fournisseur[] = [];
@Input() articles: Article[] = [];
@Input() article!: Article;


  ngOnInit() {
    this.idService.getId().subscribe(id => {
      this.id = id;
      // console.log(this.id);
    });
  }

  constructor(private formBuilder: FormBuilder, private imageService: ImagesService, private sharedService: SharedBoolService, private idService: IdServiceService) {

  this.sharedService.editModeChanged.subscribe((isEditing: boolean) => {
    this.isEditing = isEditing;
  });

  this.articleForm = this.formBuilder.group({
    libelle: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    prix: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    stock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    categorie: ['', Validators.required],
    fournisseurs: [null, Validators.required],
    photo: [this.img, Validators.required],
    ref: ['']
  });

  this.articleForm.get('libelle')!.valueChanges
    .subscribe((libelle) => {
      const lettersOnly = /^[a-zA-Z]+$/;
      if (libelle && lettersOnly.test(libelle)){
        this.ref = this.generateReference(libelle);
      }else{
        this.ref = "";
      }
    });

    this.articleForm.get('categorie')!.valueChanges.subscribe((categorie) => {
    if (this.ref.length === 7) {
      this.archive = categorie.toUpperCase() + '-' + this.getNumArt(categorie);
          
      this.updateRef(categorie, this.getNumArt(categorie));
    } else {
        if (this.ref.includes('-' + this.archive)) {
        this.ref = this.ref.replace('-' + this.archive, "");
        }
      this.archive = categorie.toUpperCase() + '-' + this.getNumArt(categorie);
      this.updateRef(categorie, this.getNumArt(categorie));
     }
    });

    this.articleForm.valueChanges.subscribe(value => {
      if (!value.fournisseurs) {
        this.suggestions = [];
      } else {
        const searchTerm = value.fournisseurs.trim().toLowerCase();

        if (searchTerm.length >= 3) {
          this.suggestions = this.fournisseurs.filter(fournisseur =>
            fournisseur.nomComplet.toLowerCase().includes(searchTerm)
          );
        } else {
          this.suggestions = [];
        }
      }
    });

  }

  generateErrorMessages(): void {
    this.formErrorMessages = [];

    const libelleControl = this.articleForm?.get('libelle');

    if (libelleControl?.hasError('pattern') && libelleControl.touched && !libelleControl.hasError('required')) {
      this.formErrorMessages.push('Le libellé ne doit contenir que des lettres.');
    }

    if (libelleControl?.hasError('required') && libelleControl.touched) {
      this.formErrorMessages.push('Le libelle est requis.');
    }
    
    setTimeout(() => {
      this.formErrorMessages = [];
    }, 3000);
  }

  changeLib(){
    this.generateErrorMessages();
  }

  selectSuggestion(suggestion: any) {
    this.selectedFournisseurs.push(suggestion.nomComplet);
    this.suggestions = [];
  }

  deselectFournisseur(fournisseur: any) {
    const index = this.selectedFournisseurs.indexOf(fournisseur);
    if (index !== -1) {
      this.selectedFournisseurs.splice(index, 1);
    }
  }

  updateRef(categorie: string, num: number) {
    this.ref += '-' + categorie.toUpperCase() + '-' + num;
  }

  generateReference(libelle: string) {
    return 'REF-' + libelle.slice(0, 3).toUpperCase();
  }

  getNumArt(categorie: string): number {
    const foundCategory = this.categories.find(cat => cat.libelle === categorie);
    return foundCategory ? +foundCategory.numArticles + 1 : 0;
  }

  handleFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedImage = inputElement.files?.[0] as File;
    this.name = selectedImage.name
    
    if (selectedImage) {
      this.imageService.recupImg(selectedImage).subscribe({
        next: (arg) => {
          this.img = arg as string;
          this.articleForm.patchValue({
            photo: this.img, 
          });
        }
      });
    }
    // console.log(this.name);
    // console.log(this.img);
  }

  addOrEdit() {
    if (this.isEditing) {
      this.editArticle();
      this.selectedFournisseurs
    } else {
      this.ajouter();
      this.selectedFournisseurs
    }
  }

  ajouter() {
    const article: Article = {
      id: null,
      libelle: this.articleForm.value.libelle,
      prix: this.articleForm.value.prix,
      stock: this.articleForm.value.stock,
      categorie_libelle: this.articleForm.value.categorie,
      fournisseurs: this.selectedFournisseurs,
      photo: this.name,
      photo_name: this.img
    };
    this.addArticleEvent.emit(article);
    // console.log(article.fournisseurs);
    this.articleForm.reset();
    this.selectedFournisseurs=[];
  }

  editArticle() {
    const article: Article = {
      id: this.id,
      libelle: this.articleForm.value.libelle,
      prix: this.articleForm.value.prix,
      stock: this.articleForm.value.stock,
      categorie_libelle: this.articleForm.value.categorie,
      fournisseurs: this.selectedFournisseurs,
      photo: this.name,
      photo_name: this.img
    };
    this.editArticleEvent.emit(article);
    // console.log(article);
    this.articleForm.reset();
    this.isEditing = false;
    this.selectedFournisseurs = [];
  }


}

