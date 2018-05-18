import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HeroListService } from '../hero-list/hero-list.service';

@Component({
  selector: 'hero-overview',
  templateUrl: './hero-overview.component.html',
  styleUrls: ['./hero-overview.component.scss']
})
export class HeroOverviewComponent implements OnDestroy {
  @Output() event: EventEmitter<any> = new EventEmitter();
  chartData;
  cmsData: Array<any>;
  _heroListChangeSubscription;

  constructor(private listService: HeroListService) {
    this.chartData = {
      id: 'age_chart',
      width: '100%',
      height: 300,
      type: 'column2d',
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: 'Superhero Ages',
          theme: 'fint'
        },
        data: []
      }
    };
    this._heroListChangeSubscription = this.listService.listChanges.subscribe((list) => {
      this.updateChart(list);
    });
    // GET cms data from Google Spreadsheet
    this.listService.getGoogleSheetData().subscribe((rawData) => {
      this.cmsData = this.formatData(rawData.feed.entry);
    });
  }

  updateChart(heroes) {
    const newData = [];
    for (let i = 0; i < heroes.length; i++) {
      newData.push({
        label: `${heroes[i].name.first} ${heroes[i].name.last}`,
        value: heroes[i].age
      });
    }
    this.chartData.dataSource.data = newData;
  }

  formatData(data) {
    const formattedData = [];
    for (let i = 0; i < data.length; i++) {
      const tempData: any = {
        title: data[i].gsx$title.$t,
        description: data[i].gsx$description.$t
      };
      if (data[i].gsx$description2) {
        tempData.description2 = data[i].gsx$description2.$t;
      }
      formattedData.push(tempData);
    }
    return formattedData;
  }

  goToPage(page) {
    this.event.emit(page);
  }

  ngOnDestroy() {
    this._heroListChangeSubscription.unsubscribe();
  }
}
