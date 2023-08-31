
import { Categorie } from "./paginated-categorie.interface";
import { Breukh } from "./breukh";
import { Article } from "./article";
import { Articles } from "./articles";


export interface ArticleVente extends Articles {
    qteStock?: string;
    cout?: string;
    valeur?: string;
    marge: string;
    prix_vente?: string;
    promo: number;
    article?: Article[];
    articlesConfection: any 
}

