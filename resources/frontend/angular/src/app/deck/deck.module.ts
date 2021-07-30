import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckComponent } from './deck.component';
import { DeckRoutingModule } from './deck-routing.module';
import { DeckListComponent } from './deck-list/deck-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { DeckViewComponent } from './deck-view/deck-view.component';
import { DeckViewListComponent } from './deck-view/deck-view-list/deck-view-list.component';
import { DeckViewSpreadComponent } from './deck-view/deck-view-spread/deck-view-spread.component';
import { ChartsModule } from 'ng2-charts';
import { CardChartComponent } from './deck-view/card-chart/card-chart.component';
import { ColorChartComponent } from './deck-view/color-chart/color-chart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeckListViewComponent } from './deck-list/view/view.component';

@NgModule({
  declarations: [
    DeckComponent,
    DeckListComponent,
    DeckViewComponent,
    DeckViewListComponent,
    DeckViewSpreadComponent,
    CardChartComponent,
    ColorChartComponent,
    DeckListViewComponent],
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
