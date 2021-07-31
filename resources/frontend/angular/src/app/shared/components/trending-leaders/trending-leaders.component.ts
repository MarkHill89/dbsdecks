import { Component, OnInit } from '@angular/core';
import { DataService } from '@dbsdecks/app/infrastructure/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trending-leaders',
  templateUrl: './trending-leaders.component.html',
  styleUrls: ['./trending-leaders.component.scss']
})
export class TrendingLeadersComponent implements OnInit {
  
  trendingLeaders: any = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData(): Promise<any> {
    try {
      this.trendingLeaders = await this.dataService.getTrendingLeaders();
    } catch(e) {
      console.log(e);
    }
  }

  imageSource(imageString: string) {
    let imageArray = JSON.parse(imageString);
    return imageArray[0];
  }
}
