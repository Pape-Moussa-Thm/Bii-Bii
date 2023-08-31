import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';
import { ImagesService } from 'src/app/services/image-service/images.service';
import { SharedBoolService } from 'src/app/services/other-fonctionnality-service/shared-bool.service';
import { IdServiceService } from 'src/app/services/other-fonctionnality-service/id-service.service';
import { Categorie } from 'src/app/interfaces/paginated-categorie.interface';
import { Breukh } from 'src/app/interfaces/breukh';
import { Article } from 'src/app/interfaces/article';
import { ForMe } from 'src/app/interfaces/for-me';
import { ArticleVente } from 'src/app/interfaces/article-vente';


@Component({
  selector: 'app-formm',
  templateUrl: './formm.component.html',
  styleUrls: ['./formm.component.css']
})
export class FormmComponent {

  @Input() categories: Categorie[] = [];
  @Input() artConfect: Article[] = [];

  @Output() getPrix = new EventEmitter();
  @Output() addArtVenteEvent = new EventEmitter<ArticleVente>();
  @Output() editArticleEvent = new EventEmitter<ArticleVente>();
  @Input() art: ArticleVente[] = [];


  id!: number | null;
  artVenteForm!: FormGroup;
  name: string = '';
  prom: number = 0;
  ref: string = '';
  cout: number = 0;
  pv: number = 0;
  mrg: number = 0;
  archive: string = '';
  img: string = "assets/images/reunion_family.jpg";
  articlesConf: FormArray;
  suggestions:  Article[][] = [];
  recupArtConf: any;
  isEditing: boolean = false;
  libs: boolean = true;

  
  ngOnInit()
  {
    this.idService.getId().subscribe(id => {
      this.id = id;
      // console.log(this.id);
    });    
  }

  constructor(private fb: FormBuilder, private imageService: ImagesService, private sharedService: SharedBoolService, private idService: IdServiceService) {

    this.sharedService.editModeChanged.subscribe((isEditing: boolean) => {
      this.isEditing = isEditing;
    });

    this.artVenteForm = this.fb.group({
      libelle: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)]],
      categorie: [''],
      promo: [],
      valeur: ['', [this.onlyDigitsValidator, this.monChampValidation]],
      articlesConfection: this.fb.array([
        // this.fb.group({
        //   lib: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)]],
        //   qte: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[0-9]*$/)]]
        // })
      ], [this.validateArticlesConfection]),
      photo: [this.img],
      marge: ['', [Validators.required, this.margeValidator, this.onlyDigitsValidator]],
      prixVente: ['']
    });
    this.articlesConf = this.fb.array([]);

    this.artVenteForm.get('promo')!.valueChanges
      .subscribe((promo) => {
        this.prom = promo ? 1 : 0;        
    });

    this.artVenteForm.get('categorie')!.valueChanges.subscribe((categorie) => {
      if (this.ref.length < 7) {
        this.ref = "";
      }
      else if (this.ref.length === 7) {
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

    this.articlesConfection.valueChanges.subscribe((articles) => {

      // articles.forEach((article:Breukh) =>{ console.log(article.qte);
      // });

      const test = articles.every((article: Breukh) => !isNaN(article.qte));
      // console.log(test);
      
      if (test) {
        
        const articlesConfection = this.articlesConfection.value;
        this.recupArtConf = articlesConfection.map((article: Breukh) => {
          const libelle = article.lib;
          const qte = article.qte;
          return {
            libs: libelle,
            qte: qte
          };
        });
        // console.log(this.recupArtConf);

        this.recupArtConf.forEach((article: ForMe) => {
          const art = article.libs;
          const prix = this.artConfect.find(arti => arti.libelle.includes(art))?.prix;
          // console.log(art.length);
          
          if (prix != undefined && art.length > 3) {
              this.cout += prix * +article.qte;
              // console.log(prix);
          }

            // if (this.pv) {
            //   this.pv += this.cout
            // } else {
            //   this.pv = this.cout;
            // }
          
        });
    }

    })

    this.artVenteForm.get('marge')!.valueChanges.subscribe((marge) => {
      // if (this.cout) {
        // this.mrg = +marge;
        this.pv = +this.cout + +marge;
      // }

    })

  }

  libelleChange(event: Event)
  {
    if (event.target instanceof HTMLInputElement) {
      const libelle = event.target.value;  

      if (libelle.length >= 4) {
        const correspondance = this.art.some((article: ArticleVente) => article.libelle === libelle);

          if (!correspondance) {
            this.libs = true;
            this.ref = this.generateReference(libelle);
          }else{
            this.libs = false;
            this.ref = '';
          }
      }else{
        this.ref = "";
      }
    }
  }

  monChampValidation(control: AbstractControl): ValidationErrors | null {
    const valeur = control.value;
    if (valeur && valeur <= 5) {
      return { monChampValidation: true };
    }
    return null;
  }

  validateArticlesConfection(control: AbstractControl): ValidationErrors | null {
    const articlesArray = control as FormArray;

    if (articlesArray.controls.length < 3) {
      return { lignesNotEnough: true };
    }

    const libelle = articlesArray.controls.map((item: AbstractControl) => item.get('lib')?.value.slice(0, 3));
    const libsRequis = ['tis', 'bou', 'fil'];

    const validateNow = libelle.filter(element => !libsRequis.includes(element));
    
    if (validateNow.length > 0) 
    {
      return { invalidArt: true };
    }

    return null;
  }

  onlyDigitsValidator(control: AbstractControl) {
    const value = control.value;
    if (value && !/^\d+$/.test(value)) {
      return { onlyDigits: true };
    }
    return null;
  }

  margeValidator(control: AbstractControl) {
    const value = control.value;
    if (value !== null && (isNaN(value) || value < 500)) {
      return { min: true };
    }
    return null;
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

  get articlesConfection() {
    return this.artVenteForm.get('articlesConfection') as FormArray;
  }

  addArticleConfection() {

    for (const control of this.articlesConfection.controls) {
      if (control.invalid) {
        return;
      }
    }

    const articleGroup = this.fb.group({
      lib: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)]],
      qte: [{ value: 1, disabled: true }, [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    });
    this.articlesConfection.push(articleGroup);
  }

  removeArticleConfection(index: number) {
    // if (index != 0) {
      this.articlesConfection.removeAt(index);
    // }
  }

  onLibInput(event: Event, i: number) {
    if (event.target instanceof HTMLInputElement) {
      const newValue = event.target.value;
      const searchTerm = newValue.trim().toLowerCase();

      const libelleControl = this.getLibField(i);
      const qteControl = this.getQteField(i);

      if (libelleControl && qteControl) {
        libelleControl.setValue(newValue);

        if (libelleControl.valid) {
          qteControl.enable();
          // this.display = true; 
        } else {
          qteControl.disable();
          // this.display = false; 
        }
      }

      if (searchTerm.length >= 3) {
        this.suggestions[i] = this.artConfect
          .filter(art => art.libelle.toLowerCase().startsWith(searchTerm))
          .filter(art => !this.isSuggestionChosen(art.libelle, i));
      } else {
        this.suggestions[i] = [];
      }
    }
  }

  getLibField(index: number): FormControl | null {
    return this.articlesConfection.at(index)?.get('lib') as FormControl;
  }

  getQteField(index: number): FormControl | null {
    return this.articlesConfection.at(index)?.get('qte') as FormControl;
  }
  
  insertSuggestion(i: number, suggestion: Article) {
    const libelleControl = this.articlesConfection.at(i).get('lib');
    if (libelleControl) {
      libelleControl.setValue(suggestion.libelle);
    }

    this.removeSuggestionFromList(suggestion.libelle);
    this.suggestions[i] = [];

  }

  isSuggestionChosen(libelle: string, index: number): boolean {
    const chosenLibelles = this.articlesConfection.controls
      .map(control => control.get('lib')?.value)
      .filter(value => !!value && value !== libelle);

    return chosenLibelles.includes(libelle);
  }

  removeSuggestionFromList(libelle: string) {
    this.artConfect = this.artConfect.filter(art => art.libelle !== libelle);
  }

  handleFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedImage = inputElement.files?.[0] as File;
    this.name = selectedImage.name

    if (selectedImage) {
      this.imageService.recupImg(selectedImage).subscribe({
        next: (arg) => {
          this.img = arg as string;
          this.artVenteForm.patchValue({
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
    } else {
      this.ajouter();
    }

    // if (this.articlesConfection.invalid) {
    //   if (this.articlesConfection.errors && this.articlesConfection.errors['minLignes']) {
    //     console.log("Le FormArray doit avoir au moins 3 lignes.");
    //   }
    // } else {
    //   console.log("Le FormArray est valide. Soumission en cours...");
    // }

  }

  ajouter() {
    
    const article: ArticleVente = {
      id: null,
      libelle: this.artVenteForm.value.libelle,
      promo: this.prom,
      valeur: this.artVenteForm.value.valeur,
      marge: this.artVenteForm.value.marge,
      categorie_libelle: this.artVenteForm.value.categorie,
      articlesConfection: this.recupArtConf,
      photo: this.name,
      photo_name: this.img
    };
    // console.log(article);
    this.addArtVenteEvent.emit(article);
    this.artVenteForm.reset();
  }
  
  editArticle() {    

    const article: ArticleVente = {
      id: this.id,
      libelle: this.artVenteForm.value.libelle,
      promo: this.prom,
      valeur: this.artVenteForm.value.valeur,
      marge: this.artVenteForm.value.marge,
      categorie_libelle: this.artVenteForm.value.categorie,
      articlesConfection: this.recupArtConf,
      photo: this.name,
      photo_name: this.img
    };
    // console.log(article);
    this.editArticleEvent.emit(article);
    this.artVenteForm.reset();
    this.isEditing = false;
  }    


}

