import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckBuilderComponent } from './deck-builder.component';
import { DeckBuilderRoutingModule } from './deck-builder-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '@dbsdecks/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DeckBuilderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InfiniteScrollModule,
    DeckBuilderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule

  ]
})
export class DeckBuilderModule { }
