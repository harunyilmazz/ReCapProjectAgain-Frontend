import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarDetailComponent},
  {path:"cars",pathMatch:"full", component:CarDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
