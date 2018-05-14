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
    console.log('chart', this.chartData);
  }

  goToPage(page) {
    this.event.emit(page);
  }

  ngOnDestroy() {
    this._heroListChangeSubscription.unsubscribe();
  }
}
