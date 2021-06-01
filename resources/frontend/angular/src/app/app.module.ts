import { NgModule } from '@angular/core';  
import {HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfrastructureModule } from  "./infrastructure/infrastructure.module";
import { DeckComponent } from './deck/deck.component';
import {LoginComponent} from '@dbsdecks/app/login/login.component';
import {DeckListComponent} from '@dbsdecks/app/deck/deck-list/deck-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// Modals
import { CardsModule } from './cards/cards.module';
import { DeckBuilderComponent } from './deck-builder/deck-builder.component';
import { DeckBuilderModule } from './deck-builder/deck-builder.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeckComponent,
    DeckListComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardsModule,
    DeckBuilderModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule, 
    InfrastructureModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
