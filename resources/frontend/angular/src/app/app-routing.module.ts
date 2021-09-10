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
  { path: 'cards', loadChildren: () => import('./cards/cards.module').then(cards => cards.CardsModule)},
  { path: 'deck/list', component: DeckListComponent},
  { path: 'deck/view/:id', component: DeckListViewComponent},
  { path: 'deckbuilder', loadChildren: () => import('./deck-builder/deck-builder.module').then(deckbuilder => deckbuilder.DeckBuilderModule), canActivate:[AuthService]},
  { path: 'register/new', component:RegisterComponent},
  { path: 'login', component:LoginComponent},
  { path: 'portal', component:PortalComponent, canActivate:[AuthService]},
  { path: '/', component: HomeComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
