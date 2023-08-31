
export interface PaginatedCategorie {
  current_page: number;
  data: Categorie[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface Categorie {
  id?: number;
  libelle: string;
  numArticles: number,
  typeArticles?: string,
  checked?: boolean;
  created_at?: string;
  deleted_at?:string;
  updated_at?:string;
}

