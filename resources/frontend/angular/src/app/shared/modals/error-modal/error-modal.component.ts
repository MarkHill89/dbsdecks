import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'error-modal-component',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
