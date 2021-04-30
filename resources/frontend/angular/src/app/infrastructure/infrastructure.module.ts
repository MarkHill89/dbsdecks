import { NgModule } from "@angular/core";
import {DataService, NavbarService, AuthService} from "./services/";
import {SecureRouterLinkDirective} from "./services/security.service";

const DIRECTIVES = [
  SecureRouterLinkDirective
];

const PROVIDERS = [
    DataService,
    AuthService,
    NavbarService
];

@NgModule({
  declarations: DIRECTIVES,
  exports:      DIRECTIVES
})

export class InfrastructureModule {
    static forRoot() {
      return {
        ngModule: InfrastructureModule,
        providers: PROVIDERS
      }
    }
  }
  