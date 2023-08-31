import { Categorie } from "./paginated-categorie.interface";


export interface Articles {

    id: number | null;
    libelle: string;
    categorie_id?: string;
    categorie_libelle?: string;
    categorie_numArticles?: number;
    categorie?: Categorie;
    ref?: string;
    photo: string;
    photo_name: any;
    
}
