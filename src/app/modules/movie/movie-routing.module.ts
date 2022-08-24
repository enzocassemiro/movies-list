import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesModularComponent } from './pages/categories-modular/categories-modular.component';
import { MovieIdComponent } from './pages/movie-id/movie-id.component';

const routes: Routes = [
  {
    path:":category",
    component: CategoriesModularComponent
  },
  {
    path:"detail/:id",
    component: MovieIdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
