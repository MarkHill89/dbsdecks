import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckComponent } from './deck.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { DeckViewComponent } from './deck-view/deck-view.component';

const routes: Routes = [
    {
    path: '', component: DeckComponent, children: [
        {path: 'list', component: DeckListComponent},
        {path: 'view/:id', component: DeckViewComponent},
        {path: '', redirectTo: 'list', pathMatch: 'full'}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeckRoutingModule { }