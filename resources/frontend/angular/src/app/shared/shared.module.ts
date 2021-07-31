import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { DateTimePipe } from './pipes/date-time.pipe';
import { CardTextPipe } from './pipes/card-text.pipe';
import {FilterPipe} from '@dbsdecks/app/shared/pipes/filter.pipe';
import { ImageStringPipe } from './pipes/image-string.pipe';
import { CardFilterModalComponent } from './modals/card-filter-modal/card-filter-modal.component';
import { CardInfoModalComponent } from './modals/card-info-modal/card-info-modal.component';
import { DeckComponent } from './components/deck/deck.component';
import { LeaderCardComponent } from './components/leader-card/leader-card.component';
import { TrendingLeadersComponent } from './components/trending-leaders/trending-leaders.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ErrorModalComponent,
    DateTimePipe,
    CardTextPipe,
    FilterPipe,
    ImageStringPipe,
    CardInfoModalComponent,
    CardFilterModalComponent,
    DeckComponent,
    LeaderCardComponent,
    TrendingLeadersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule
  ],
  exports: [
    CardInfoModalComponent,
    CardFilterModalComponent,
    NavbarComponent,
    DeckComponent,
    DateTimePipe,
    CardTextPipe,
    FilterPipe,
    ImageStringPipe,
    LeaderCardComponent,
    TrendingLeadersComponent
  ]
})
export class SharedModule { 

}
