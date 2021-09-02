import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Color } from 'ng2-charts';

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
  colorData = [
    {id: 'Red', name: 'red'},
    {id: 'Blue', name: 'blue'},
    {id: 'Green', name: 'green'},
    {id: 'Yellow', name: 'yellow'},
    {id: 'Black', name: 'black'},
    {id: 'Green;Red', name: 'red-green'},
    {id: 'Blue;Yellow', name: 'blue-yellow'},
    {id: 'Red;Yellow', name: 'red-yellow'},
    {id: 'Blue;Green', name: 'blue-green'},
    {id: 'Blue;Red', name: 'blue-red'},
    {id: 'Green;Yellow', name: 'green-yellow'},
    {id: 'Black;Red', name: 'red-black'},
    {id: 'Black;Blue', name: 'blue-black'},
    {id: 'Black;Green', name: 'green-black'},
    {id: 'Black;Yellow', name: 'yellow-black'}
  ];

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { 
    
  }

  ngOnInit(): void {
    const title = this.cardFilters.title || '';
    const description = this.cardFilters.description || '';
    const cardNumber = this.cardFilters.cardNumber || '';

    
    this.filterForm = this.formBuilder.group({
      color: new FormArray([]),
      title: [title],
      description: [description],
      cardNumber: [cardNumber]
    });
  
    this.addCheckBoxes();

    this.filterForm.valueChanges.subscribe((formValues: any) => {
      formValues.color = this.filterForm.value.color
        .map((checked: boolean, i: number) => checked ? this.colorData[i].id : null)
        .filter((v: string | null) => v !== null)
      this.cardFilterValues.emit(formValues);
    });
  }

  get colorFormArray() {
    return this.filterForm.controls.color as FormArray;
  }

  private addCheckBoxes() {
    console.log(this.cardFilters);
  
    this.colorData.forEach((color) => {
      let idx = -1;
      if(this.cardFilters?.color?.length) {
        idx = this.cardFilters.color.indexOf(color.id);
      }
      idx > -1 ? this.colorFormArray.push(new FormControl(true)) : this.colorFormArray.push(new FormControl(false));
    });
    console.log(this.filterForm);
  }  

  clear() {
    this.filterForm.reset({
      color: new FormArray([]),
      title: '',
      description: '',
      cardNumber: ''
    });
  }

  dismiss() {
    this.activeModal.dismiss()
  }
}
