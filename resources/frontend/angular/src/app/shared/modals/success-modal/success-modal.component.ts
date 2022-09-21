import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'success-modal-component',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SuccessModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  @Input() successMessage = '';

  ngOnInit(): void {
  }

  dismiss() {
    this.activeModal.dismiss();
  }

}
