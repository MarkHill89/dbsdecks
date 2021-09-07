import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {DeckListComponent} from './deck/deck-list/deck-list.component';
import {DeckListViewComponent} from './deck/deck-list/view/view.component';
import {AuthService} from './infrastructure/services/auth.service';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';


const routes: Routes = [
  { path: 'dbsdecks/public/cards', loadChildren: () => import('./cards/cards.module').then(cards => cards.CardsModule)},
  { path: 'dbsdecks/public/deck/list', component: DeckListComponent},
  { path: 'dbsdecks/public/deck/view/:id', component: DeckListViewComponent},
  { path: 'dbsdecks/public/deckbuilder', loadChildren: () => import('./deck-builder/deck-builder.module').then(deckbuilder => deckbuilder.DeckBuilderModule), canActivate:[AuthService]},
  { path: 'dbsdecks/public/register/new', component:RegisterComponent},
  { path: 'dbsdecks/public/login', component:LoginComponent},
  { path: 'dbsdecks/public/portal', component:PortalComponent, canActivate:[AuthService]},
  { path: 'dbsdecks/public/home', component: HomeComponent},
  { path: '**', redirectTo: '/dbsdecks/public/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
