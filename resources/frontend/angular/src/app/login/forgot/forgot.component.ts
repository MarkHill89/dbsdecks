import { Component, OnInit } from '@angular/core';
import {AuthService} from '@dbsdecks/app/infrastructure/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from '@dbsdecks/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  email = '';
  isBusy=false;
  constructor(
    protected authService: AuthService,
    private modal: NgbModal,
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  submitForgot(){
    this.isBusy = true;
    this.authService.forgotPassword(this.email).subscribe(res =>{
      if(res){
        this.bsModalRef.hide();
        const modalRef = this.modal.open(SuccessModalComponent);        
        modalRef.componentInstance.successMessage = `An email has been sent to ${this.email}. Please check your email for further instructions. Email may have gone to your Junk folder.`;
      }
        this.isBusy = false;
    });
  }

}
