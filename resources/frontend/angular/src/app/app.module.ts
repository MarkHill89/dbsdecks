import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http"
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardsComponent } from './cards/cards.component';
import { InfrastructureModule } from  "./infrastructure/infrastructure.module";
import { DeckComponent } from './deck/deck.component';
// Modals
import {LoginComponent} from '@dbsdecks/app/shared/modals'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardsComponent,
    DeckComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    //
    InfrastructureModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
