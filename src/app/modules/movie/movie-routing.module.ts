import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesModularComponent } from './pages/categories-modular/categories-modular.component';

const routes: Routes = [
  {
    path:":category",
    component: CategoriesModularComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
