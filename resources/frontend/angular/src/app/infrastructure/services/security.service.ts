/*
 * Copyright (c) 2018, TVI MarketPro3.
 *       www.tvi-mp3.com
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
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
  