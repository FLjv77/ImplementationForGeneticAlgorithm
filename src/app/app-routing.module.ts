import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FirstProjectComponent} from './page/first-project/first-project.component';
import {HomeComponent} from './page/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'firstProject', component: FirstProjectComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
