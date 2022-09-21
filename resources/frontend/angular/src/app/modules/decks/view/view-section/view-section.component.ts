import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss']
})
export class ViewSectionComponent implements OnInit, OnDestroy {

  @Input() editable: boolean | null = false;
  @Input() title: string = '';
  @Input() deck: string = ''; 

  onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(false);
    this.onDestroy$.complete();
  }
}
