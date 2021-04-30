import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {LoginComponent} from '@dbsdecks/app/shared/modals/login/login.component';
import {AuthService} from "@dbsdecks/app/infrastructure/services/";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  modalRef?: BsModalRef;
  show:boolean =  false;
  loading = false;
 
  constructor(
    private authService: AuthService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
  
  }

  openLogin() {
    this.modalRef = this.modalService.show(LoginComponent);
  }
  logout(){
    this.authService.logout().toPromise()
    .then(result => {
      if(result){
        localStorage.removeItem('token');
        console.log("success");
      } else{
        console.log(result);
      }
      
    });
  }
}
