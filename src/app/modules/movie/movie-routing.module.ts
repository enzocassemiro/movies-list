import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularComponent } from './pages/popular/popular.component';

const routes: Routes = [
  {
    path: 'popular',
    component: PopularComponent
  },
  {
    path: '',
    redirectTo: 'popular',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
