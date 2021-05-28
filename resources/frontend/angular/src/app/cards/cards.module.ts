import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { CardsRoutingModule } from './cards-routing.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AccordionModule } from 'ngx-bootstrap/accordion';
@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    AccordionModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    CardsRoutingModule,
    CommonModule,
    NgbModule
  ]
})
export class CardsModule { }
