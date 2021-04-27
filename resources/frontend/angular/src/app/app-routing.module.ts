import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CardsComponent} from './cards/cards.component';
import {RegisterComponent} from './register/register.component';
import {DeckListComponent} from './deck/deck-list/deck-list.component';
import {AuthService} from './infrastructure/services/auth.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'cards', component: CardsComponent},
  { path: 'deck/list', component: DeckListComponent, canActivate:[AuthService]},
  { path: 'register/new', component:RegisterComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
