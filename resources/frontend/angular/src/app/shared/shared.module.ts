import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { DateTimePipe } from './pipes/date-time.pipe';
import { CardTextPipe } from './pipes/card-text.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FilterPipe } from '@dbsdecks/app/shared/pipes/filter.pipe';
import { ImageStringPipe } from './pipes/image-string.pipe';
import { CreateDeckModalComponent } from './modals/create-deck-modal/create-deck-modal.component';
import { CardFiltersComponent } from './components/card-filters/card-filters.component';
import { UserLoginRegisterComponent } from './modals/user-login-register/user-login-register.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { CardSearchModalComponent } from './modals/card-search-modal/card-search-modal.component';


@NgModule({
  declarations: [
    CardTextPipe,
    ImageStringPipe,
    SafeHtmlPipe,
    DateTimePipe,
    FilterPipe,
    CreateDeckModalComponent,
    CardFiltersComponent,
    UserLoginRegisterComponent,
    SideNavComponent,
    CardSearchModalComponent
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [
    CardTextPipe,
    ImageStringPipe,
    SafeHtmlPipe,
    DateTimePipe,
    FilterPipe
  ]
})
export class SharedModule { 

}
