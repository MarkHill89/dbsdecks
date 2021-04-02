import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, ThemeService, Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-color-chart',
  templateUrl: './color-chart.component.html',
  styleUrls: ['./color-chart.component.scss']
})
export class ColorChartComponent implements OnInit {

  @Input() cardColorData: any;

  dChartLabels: Label[] = ["Red", "Blue", "Green", "Yellow", "Black"];
  dChartType: ChartType = 'doughnut';
  dChartLegend = false;
  dChartData: ChartDataSets[] = [];
  dChartColors = [{
      backgroundColor: [
        'rgba(240, 52, 52, 1)',
        'rgba(44, 130, 201, 1)',
        'rgba(38, 166, 91, 1)',
        'rgba(245, 230, 83, 1)',
        'rgba(189, 195, 199, 1)'
      ]
  }];
  constructor(private themeService: ThemeService) {
    themeService.setColorschemesOptions({
      legend: {
        labels: { fontColor: '#fff' }
      },
      scales: {
        xAxes: [{
          ticks: { fontColor: '#fff' },
          gridLines: { color: 'rgba(255,255,255,0.5)' }
        }],
        yAxes: [{
          ticks: { fontColor: '#fff' },
          gridLines: { color: 'rgba(255,255,255,0.5)' }
        }]
      }
    });
   }
  
  ngOnInit() {
    const redCount = this.cardColorData.reduce((n, val) => n + (val.color.includes('Red')), 0);
    this.dChartData.push(redCount);
    const blueCount = this.cardColorData.reduce((n, val) => n + (val.color.includes('Blue')), 0);
    this.dChartData.push(blueCount);
    const greenCount = this.cardColorData.reduce((n, val) => n + (val.color.includes('Green')), 0);
    this.dChartData.push(greenCount);
    const yellowCount = this.cardColorData.reduce((n, val) => n + (val.color.includes('Yellow')), 0);
    this.dChartData.push(yellowCount);
    const blackCount = this.cardColorData.reduce((n, val) => n + (val.color.includes('Black')), 0);
    this.dChartData.push(blackCount);
}

}
