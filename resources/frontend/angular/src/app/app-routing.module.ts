import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
<<<<<<< HEAD

const routes: Routes = [
  { path: 'decks', loadChildren: () => import('./modules/decks/decks.module').then(m => m.DecksModule)},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
=======
import {RegisterComponent} from './register/register.component';
import {DeckListComponent} from './deck/deck-list/deck-list.component';
import {DeckListViewComponent} from './deck/deck-list/view/view.component';
import {AuthService} from './infrastructure/services/auth.service';
import { UnsavedChangesGuard } from './infrastructure/services/unsaved-changes.guard';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';


const routes: Routes = [
  { path: 'cards', loadChildren: () => import('./cards/cards.module').then(cards => cards.CardsModule)},
  { path: 'deck/list', component: DeckListComponent},
  { path: 'deck/view/:id', component: DeckListViewComponent},
  { 
    path: 'deckbuilder', 
    loadChildren: () => import('./deck-builder/deck-builder.module')
      .then(deckbuilder => deckbuilder.DeckBuilderModule), 
    canActivate:[AuthService]
  },
  { path: 'register/new', component:RegisterComponent},
  { path: 'login', component:LoginComponent},
  { path: 'portal', component:PortalComponent, canActivate:[AuthService]},
>>>>>>> fe1a9b6cb7a1360f2025c63e0b79e162bb5b345c
  { path: '', component: HomeComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
