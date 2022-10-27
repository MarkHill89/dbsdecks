import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { CardService } from '@dbsdecks/app/api/card/card.service';
import { CardFiltersModel } from './card-filters.model';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-card-filters',
  templateUrl: './card-filters.component.html',
  styleUrls: ['./card-filters.component.scss']
})
export class CardFiltersComponent implements OnInit {

  @Output() filterValues: EventEmitter<any> = new EventEmitter();

  cardFilters!: FormGroup;
  cardFilterModels = new CardFiltersModel();

  private color = new Array;
  private cardType = new Array;
  private rarity = new Array;

  constructor(
    private cardService: CardService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cardFilters = this.formBuilder.group({
      cardType: new FormArray([]),
      rarity: new FormArray([]),
      color: new FormArray([]),
    });

    this.addCardColorCheckboxes();

    this.cardFilters.valueChanges.subscribe(formValues => {
      formValues.color = this.cardFilters.value.color
        .map((checked: boolean, i:number) => checked ? this.cardFilterModels.color[i].value : null)
        .filter((v: string | null) => v !== null);

      this.filterValues.emit(formValues);
    })
  }

  get cardTypeFormArray() {
    return this.cardFilters.controls['cardType'] as FormArray;
  }

  get cardColorFormArray() {
    return this.cardFilters.controls['color'] as FormArray;
  }
  

  get cardRarityFormArray() {
    return this.cardFilters.controls['rarity'] as FormArray;
  }

  private addCardColorCheckboxes() {
    this.cardFilterModels.color.forEach((color) => {
      let idx = -1;
      if(this.color?.length) {
        idx = this.color.indexOf(color.value)
      }
      idx > -1 ? this.cardColorFormArray.push(new FormControl(true)) : this.cardColorFormArray.push(new FormControl(false));
    });
  }
}
