import { Component } from '@angular/core';
import {DataService, NavbarService} from "@dbsdecks/app/infrastructure/services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dbsdecks-v2';
}
