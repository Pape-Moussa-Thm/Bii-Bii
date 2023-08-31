import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleventeComponent } from './components/articlevente/articlevente.component';


const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'articles', component: ArticleComponent },
  { path: 'artVente', component: ArticleventeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
