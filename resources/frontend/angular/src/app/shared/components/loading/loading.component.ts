import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'shared-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() isSmall!: boolean;

  constructor() { }


  ngOnInit(): void {
  }

}
