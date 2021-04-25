import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {LoginComponent} from '@dbsdecks/app/shared/modals/login/login.component'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  modalRef?: BsModalRef;
  show:boolean =  false;
  loading = false;
 
  constructor(private modalService: BsModalService) {}

  ngOnInit() {
  
  }

  openLogin() {
    this.modalRef = this.modalService.show(LoginComponent);
  }
}
