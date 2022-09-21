import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-card-info-modal',
  templateUrl: './card-info-modal.component.html',
  styleUrls: ['./card-info-modal.component.scss']
})
export class CardInfoModalComponent implements OnInit {
  @Input() public card: any;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {

  }

  dismiss() {
    this.activeModal.dismiss();
  }

}
