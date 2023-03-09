import { NgModule } from '@angular/core';  
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// Modals
import { GoogleAnalyticsService } from './infrastructure/services/google-analytics.service';
import { UserComponent } from './user/user.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './state/user/user.reducer';
import { UserEffects } from './state/user/user.effects';
import { deckListReducer, decksReducer } from './state/decks/decks.reducer';
import { DecksEffects } from './state/decks/decks.effects';
import { CardEffects } from './state/cards/cards.effects';
import { cardReducer, leaderCardReducer } from './state/cards/cards.reducer';
import { sideNavReducer } from './state/shared/side-nav/side-nav.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    SharedModule,
    StoreModule.forRoot({
       user : userReducer,
       decks: decksReducer,
       deckList: deckListReducer,
       leaderCards: leaderCardReducer,
       cards: cardReducer,
       sideNav: sideNavReducer
    }),
    EffectsModule.forRoot([UserEffects, DecksEffects, CardEffects])
  ],
  providers: [GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
