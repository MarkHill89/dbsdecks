import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckComponent } from './deck.component';
import { DeckRoutingModule } from './deck-routing.module';
import { DeckListComponent } from './deck-list/deck-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeckListViewComponent } from '@dbsdecks/app/deck/deck-list/view/view.component';

@NgModule({
  declarations: [
    DeckComponent,
    DeckListComponent,
    DeckListViewComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    DeckRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    NgxPaginationModule,
    NgbModule,
  ]
})
export class DeckModule { }
