import { Component, OnInit } from '@angular/core';
import { AuthService } from '@dbsdecks/app/infrastructure/services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { reject } from 'lodash';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  password = '';
  constructor(
    private activeModal: NgbActiveModal,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async submit(){
    try{
      await this.authService.updatePassword(this.password).subscribe(res =>{
        if(res){
          Promise.resolve(res);
          this.close();
        }
      });
    } catch(e){
      Promise.reject(e);
    }

  }

  close() {
    this.activeModal.close();
  }

}
