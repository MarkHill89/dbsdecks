import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { DateTimePipe } from './pipes/date-time.pipe';
import { CardTextPipe } from './pipes/card-text.pipe';
import { ImageStringPipe } from './pipes/image-string.pipe';
import { CardFilterModalComponent } from './modals/card-filter-modal/card-filter-modal.component';
import { CardInfoModalComponent } from './modals/card-info-modal/card-info-modal.component';
import { DeckComponent } from './components/deck/deck.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ErrorModalComponent,
    DateTimePipe,
    CardTextPipe,
    ImageStringPipe,
    CardInfoModalComponent,
    CardFilterModalComponent,
    DeckComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
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
    ImageStringPipe
  ]
})
export class SharedModule { 

}
