import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnsavedChangesGuard } from '../infrastructure/services/unsaved-changes.guard';
import { DeckBuilderComponent } from './deck-builder.component';

const routes: Routes = [
  {
    path: '', component: DeckBuilderComponent, children: [],
    canDeactivate: [UnsavedChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeckBuilderRoutingModule { }
