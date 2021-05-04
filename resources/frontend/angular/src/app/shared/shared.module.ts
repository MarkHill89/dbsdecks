import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';


@NgModule({
  declarations: [
    NavbarComponent,
    ErrorModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
    ChartsModule
  ],
  exports: [
    NavbarComponent,
  ]
})
export class SharedModule { 

}
