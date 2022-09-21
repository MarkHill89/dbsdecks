import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
  path: '',
  children: [
    {path: '', component: ListsComponent},
    {path: 'view/:deckId', component: ViewComponent},
    {path: 'edit/:deckId', component: ViewComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksRoutingModule { }
