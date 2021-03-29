import { Component } from '@angular/core';
import {DataService, NavbarService} from "@dbsdecks/infrastructure/services"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dbsdecks-v2';
}
