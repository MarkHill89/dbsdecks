import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckBuilderComponent } from './deck-builder.component';
import { DeckBuilderRoutingModule } from './deck-builder-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '@dbsdecks/app/shared/shared.module';


@NgModule({
  declarations: [
    DeckBuilderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InfiniteScrollModule,
    DeckBuilderRoutingModule,
  ]
})
export class DeckBuilderModule { }
