import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, ThemeService, Color, BaseChartDirective } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { CardService } from '../../../../services/card.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-card-info-modal',
  templateUrl: './card-info-modal.component.html',
  styleUrls: ['./card-info-modal.component.scss']
})
export class CardInfoModalComponent implements OnInit {
  @Input() public card: any;
  @Input() public prices: any = [];
  @Input() public showPrice: boolean = true;
  @Input() public showBuyLink: boolean = true;
  @Input() public isDeckBuilder: boolean = false;
  @Input() public showPricingTable: boolean = false;


  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  subscriptions: Subscription[] = [];

  // pricing data arrays for mapping
  public lowPrice: number = 0.00;
  public lowPrices: any[] = [];
  public midPrices: any[] = [];
  public highPrices: any[] = [];
  public dates: any[] = [];
  public showLineChart: boolean = false;
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Low Prices' },
    { data: [], label: 'Mid Prices' },
    { data: [], label: 'High Prices'}
  ];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    }
  };
  public lineChartLabels: Label[] = [];
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartColors: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(0,0,255,0.2)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(0,255,0,0.2)',
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.2)',
    },
  ];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if(this.showPricingTable) {
      this.lowPrice = this.card.pricingData.lowPrices[this.card.pricingData.lowPrices.length-1];
      this.lineChartData[0].data = this.card.pricingData.lowPrices;
      this.lineChartData[1].data = this.card.pricingData.midPrices;
      this.lineChartData[2].data = this.card.pricingData.highPrices;
      this.lineChartLabels = this.card.pricingData.dateLabels;
      this.showLineChart = true;
    }
  }

  close(card) {
    this.activeModal.close(card);
  }
  dismiss() {
    this.activeModal.dismiss();
  }
  findProductPrice(productId) {
    let price = this.prices.find(e => parseInt(e.productId) === parseInt(productId));
    if(!price) {
      return {lowPrice : 0}
    }
    return price;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
