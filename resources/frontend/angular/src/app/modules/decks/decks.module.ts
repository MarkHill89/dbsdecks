import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecksRoutingModule } from './decks-routing.module';
import { DecksComponent } from './decks.component';
import { ListsComponent } from './lists/lists.component';
import { ViewComponent } from './view/view.component';
import { ViewSectionComponent } from './view/view-section/view-section.component';


@NgModule({
  declarations: [
    DecksComponent,
    ListsComponent,
    ViewComponent,
    ViewSectionComponent
  ],
  imports: [
    CommonModule,
    DecksRoutingModule
  ]
})
export class DecksModule { }
