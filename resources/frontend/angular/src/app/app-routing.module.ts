import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {  } from "./shared/modals/";
import {DeckListComponent} from './deck/deck-list/deck-list.component';
import {AuthService} from './infrastructure/services/auth.service';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'cards', loadChildren: () => import('./cards/cards.module').then(cards => cards.CardsModule)},
  { path: 'deck/list', component: DeckListComponent, canActivate:[AuthService]},
  { path: 'deckbuilder', loadChildren: () => import('./deck-builder/deck-builder.module').then(deckbuilder => deckbuilder.DeckBuilderModule)},
  { path: 'register/new', component:RegisterComponent},
  { path: 'login', component:LoginComponent},
  { path: 'portal', component:LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
