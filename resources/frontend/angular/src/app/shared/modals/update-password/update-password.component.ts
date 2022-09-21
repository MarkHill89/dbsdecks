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
  isBusy:boolean = false;
  constructor(
    private activeModal: NgbActiveModal,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async submit(){
    try{
      this.isBusy = true;
      await this.authService.updatePassword(this.password).subscribe(res =>{
        if(res){
          this.isBusy = false;
          Promise.resolve(res);
          this.close();
        }
      });
    } catch(e){
      this.isBusy = false;
      Promise.reject(e);
    }

  }

  close() {
    this.activeModal.close();
  }

}
