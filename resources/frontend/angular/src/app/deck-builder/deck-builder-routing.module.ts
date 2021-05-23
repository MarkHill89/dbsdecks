import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckBuilderComponent } from './deck-builder.component';

const routes: Routes = [
  {
    path: '', component: DeckBuilderComponent, children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeckBuilderRoutingModule { }
