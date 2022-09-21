import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { DateTimePipe } from './pipes/date-time.pipe';
import { CardTextPipe } from './pipes/card-text.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import {FilterPipe} from '@dbsdecks/app/shared/pipes/filter.pipe';
import { ImageStringPipe } from './pipes/image-string.pipe';
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
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [
    CardTextPipe,
    ImageStringPipe,
    SafeHtmlPipe,
    DateTimePipe,
    FilterPipe
  ]
})
export class SharedModule { 

}
