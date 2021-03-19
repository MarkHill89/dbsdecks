import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {CardsComponent} from './cards/cards.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'cards', component: CardsComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
