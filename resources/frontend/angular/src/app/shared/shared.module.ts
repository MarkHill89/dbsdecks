import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

// Modals
import {LoginComponent} from '@dbsdecks/app/shared/modals'


@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
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
