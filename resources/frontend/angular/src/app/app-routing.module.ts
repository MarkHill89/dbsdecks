import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {DeckListComponent} from './deck/deck-list/deck-list.component';
import {AuthService} from './infrastructure/services/auth.service';


const routes: Routes = [
  { path: 'cards', loadChildren: () => import('./cards/cards.module').then(cards => cards.CardsModule)},
  { path: 'deck/list', component: DeckListComponent, canActivate:[AuthService]},
  { path: 'register/new', component:RegisterComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
