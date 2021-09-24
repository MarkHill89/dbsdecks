
import {
    Injectable,
    Directive,
    Input,
    Renderer2,
    ElementRef,
    OnInit,
    ContentChildren,
    QueryList
  } from "@angular/core";
  import { Observable } from "rxjs";

  import {
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivate,
    Router,
    ActivatedRoute,
    RouterLink,
    RouterLinkActive,
    RouterLinkWithHref,
    UrlTree,
  } from "@angular/router";
  import { LocationStrategy } from "@angular/common";
  
  /**
   * A service for managing security settings.
   */
  @Injectable()
  export class SecurityService {

  
    constructor() {
    
    }
  
  }
  
 
  @Directive({
    selector: ":not(a)[secureRouterLink]"
  })
  export class SecureRouterLinkDirective extends RouterLink implements OnInit {
    data = null;
  
    constructor(router: Router,
                route: ActivatedRoute,
                renderer: Renderer2,
                private el: ElementRef,
                private security: SecurityService) {
      super(router, route, "0", renderer, el);
    }
  
 
  
    ngOnInit() {
    }
  }
  
  @Directive({
    selector: "a[secureRouterLink]"
  })
  export class SecureRouterLinkWithHrefDirective extends RouterLinkWithHref implements OnInit {
    data = null;
  
    constructor(router: Router,
                route: ActivatedRoute,
                locationStrategy: LocationStrategy,
                private el: ElementRef,
                private security: SecurityService) {
      super(router, route, locationStrategy);
    }
  
    ngOnInit() {}
  }
  
  @Directive({
    selector: "[secureRouterLinkActive]",
    exportAs: "secureRouterLinkActive",
  })
  export class SecureRouterLinkActiveDirective extends RouterLinkActive {
  
    @Input()
    set secureRouterLinkActive(data: string[] | string) {
      this.routerLinkActive = data;
    }
  }
  