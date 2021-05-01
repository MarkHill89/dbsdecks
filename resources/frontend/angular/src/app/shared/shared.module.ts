import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { DateTimePipe } from './pipes/date-time.pipe';
import { CardTextPipe } from './pipes/card-text.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    ErrorModalComponent,
    DateTimePipe,
    CardTextPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
    ChartsModule
  ],
  exports: [
    NavbarComponent,
    DateTimePipe,
    CardTextPipe
  ]
})
export class SharedModule { 

}
