import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'error-modal-component',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorModalComponent implements OnInit {

  constructor() { }
  @Input() error = '';
  ngOnInit(): void {
  }

}
