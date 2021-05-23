import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-filter-modal',
  templateUrl: './card-filter-modal.component.html',
  styleUrls: ['./card-filter-modal.component.scss']
})
export class CardFilterModalComponent implements OnInit {

  @Input() modalTitle: string = '';
  @Input() cardFilters: any = {};
  @Output() cardFilterValues: EventEmitter<any> = new EventEmitter<any>();

  public filterForm: any;
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { }

  

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      title: [''],
      description: ['']
    });

    this.filterForm.valueChanges.subscribe((formValues: any) => {
      this.cardFilterValues.emit(formValues);
    });
  }

  dismiss() {
    this.activeModal.dismiss()
  }
}
