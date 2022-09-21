import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

=======
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
>>>>>>> fe1a9b6cb7a1360f2025c63e0b79e162bb5b345c
import { DateTimePipe } from './pipes/date-time.pipe';
import { CardTextPipe } from './pipes/card-text.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import {FilterPipe} from '@dbsdecks/app/shared/pipes/filter.pipe';
import { ImageStringPipe } from './pipes/image-string.pipe';
<<<<<<< HEAD
import { TrendingLeadersComponent } from './components/trending-leaders/trending-leaders.component';
import { UserNameCheckDirective } from './directives/user-name-check.directive';
import { EmailCheckDirective } from './directives/email-check.directive';
import { CreateDeckModalComponent } from './modals/create-deck-modal/create-deck-modal.component';


@NgModule({
  declarations: [
    CardTextPipe,
    ImageStringPipe,
    SafeHtmlPipe,
    DateTimePipe,
    FilterPipe,
    TrendingLeadersComponent,
    CreateDeckModalComponent
=======
import { CardFilterModalComponent } from './modals/card-filter-modal/card-filter-modal.component';
import { CardInfoModalComponent } from './modals/card-info-modal/card-info-modal.component';
import { DeckComponent } from './components/deck/deck.component';
import { LeaderCardComponent } from './components/leader-card/leader-card.component';
import { TrendingLeadersComponent } from './components/trending-leaders/trending-leaders.component';
import { UpdatePasswordComponent } from './modals/update-password/update-password.component';
import { UserNameCheckDirective } from './directives/user-name-check.directive';
import { EmailCheckDirective } from './directives/email-check.directive';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FooterComponent } from './components/footer/footer.component';
import { SampleHandModalComponent } from './modals/sample-hand-modal/sample-hand-modal.component';
import { DeckSectionComponent } from './components/deck-section/deck-section.component';
import { PresenterModalComponent } from './modals/presenter-modal/presenter-modal.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ErrorModalComponent,
    DateTimePipe,
    CardTextPipe,
    FilterPipe,
    ImageStringPipe,
    SafeHtmlPipe,
    CardInfoModalComponent,
    CardFilterModalComponent,
    DeckComponent,
    LeaderCardComponent,
    TrendingLeadersComponent,
    UpdatePasswordComponent,
    UserNameCheckDirective,
    EmailCheckDirective,
    SuccessModalComponent,
    LoadingComponent,
    FooterComponent,
    SampleHandModalComponent,
    DeckSectionComponent,
    PresenterModalComponent
>>>>>>> fe1a9b6cb7a1360f2025c63e0b79e162bb5b345c
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
<<<<<<< HEAD
    TypeaheadModule.forRoot(),
=======
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    FormsModule,
>>>>>>> fe1a9b6cb7a1360f2025c63e0b79e162bb5b345c
    ReactiveFormsModule,
  ],
  exports: [
<<<<<<< HEAD
    CardTextPipe,
    ImageStringPipe,
    SafeHtmlPipe,
    DateTimePipe,
    FilterPipe
=======
    CardInfoModalComponent,
    PresenterModalComponent,
    CardFilterModalComponent,
    NavbarComponent,
    FooterComponent,
    DeckComponent,
    DateTimePipe,
    CardTextPipe,
    FilterPipe,
    ImageStringPipe,
    SafeHtmlPipe,
    LeaderCardComponent,
    TrendingLeadersComponent,
    UserNameCheckDirective,
    EmailCheckDirective,
    LoadingComponent,
    DeckSectionComponent
>>>>>>> fe1a9b6cb7a1360f2025c63e0b79e162bb5b345c
  ]
})
export class SharedModule { 

}
