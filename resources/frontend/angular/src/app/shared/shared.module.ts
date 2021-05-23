import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { DateTimePipe } from './pipes/date-time.pipe';
import { CardTextPipe } from './pipes/card-text.pipe';
import { ImageStringPipe } from './pipes/image-string.pipe';
import { CardFilterModalComponent } from './modals/card-filter-modal/card-filter-modal.component';
import { DeckListComponent } from './components/deck/deck-list/deck-list.component';
import { DeckSpreadComponent } from './components/deck/deck-spread/deck-spread.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ErrorModalComponent,
    DateTimePipe,
    CardTextPipe,
    ImageStringPipe,
    CardFilterModalComponent,
    DeckListComponent,
    DeckSpreadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule
  ],
  exports: [
    CardFilterModalComponent,
    NavbarComponent,
    DateTimePipe,
    CardTextPipe,
    ImageStringPipe
  ]
})
export class SharedModule { 

}
