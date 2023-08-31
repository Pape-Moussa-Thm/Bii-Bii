import { Articles } from "./articles";
import { Breukh } from "./breukh";
import { Fournisseur } from "./fournisseur";
import { Categorie } from "./paginated-categorie.interface";

export interface Article extends Articles {
    prix: number;
    stock: string;
    fournisseurs: Fournisseur[];
    pivot?: Breukh;

}

