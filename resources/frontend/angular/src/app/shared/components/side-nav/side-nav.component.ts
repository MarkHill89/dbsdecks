import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@dbsdecks/app/state/app.state';
import { selectSideNavState } from '@dbsdecks/app/state/shared/side-nav/side-nav.selectors';
import { closeSideNav, openSideNav } from '@dbsdecks/app/state/shared/side-nav/side-nav.actions';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {

  @Input() title: string = "Filters";

  isOpen$ = this.store.select(selectSideNavState)

  openNav() {
    this.store.dispatch(openSideNav({open: true}))
  }

  closeNav() {
    this.store.dispatch(closeSideNav({open: false}))
  }

  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isOpen$.subscribe(data => console.log(data))
  }

}
