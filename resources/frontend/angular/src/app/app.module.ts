import { NgModule } from '@angular/core';  
import {HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
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
import {DeckListViewComponent} from '@dbsdecks/app/deck/deck-list/view/view.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
// Modals
import { CardsModule } from './cards/cards.module';
import { DeckBuilderComponent } from './deck-builder/deck-builder.component';
import { DeckBuilderModule } from './deck-builder/deck-builder.module';
import { ForgotComponent } from './login/forgot/forgot.component';
import { GoogleAnalyticsService } from './infrastructure/services/google-analytics.service';
import { PortalComponent } from './portal/portal.component';
import { DeckModule } from './deck/deck.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    PortalComponent
  ],
  imports: [
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    BrowserModule,
    AppRoutingModule,
    CardsModule,
    DeckBuilderModule,
    HttpClientModule,
    DeckModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule, 
    InfrastructureModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
