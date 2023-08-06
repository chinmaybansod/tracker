import { Component, OnInit, Output } from '@angular/core';
import { DataService } from './service/data.service';
import * as echarts from 'echarts';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as moment from 'moment';

type ChartData = {
  value: string,
  name: string,
  id: string
}

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.scss']
})
export class ReservoirComponent implements OnInit {
  reservoirChart: any;
  chartData: ChartData[] = [];
  chartResultData: ChartData[] = [];
  lastUpdated: string = '';
  chartArray: any[] = [];
  searchString = '';
  dropdownList: { item_id: number; item_text: string; }[] = [];
  selectedItems: { item_id: number; item_text: string; }[] = [];
  dropdownSettings: IDropdownSettings;
  isError: boolean;
  isEmpty: boolean;
  selectedDate: any;

  constructor(private dataService: DataService) {
    this.isError = false;
    this.isEmpty = false;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }

  ngOnInit(): void {
    let currentDate = moment();
    if (currentDate.hours() < 9) {
      currentDate = currentDate.subtract(1, 'day');
    }
    this.getReservoirData(currentDate);
  }

  getReservoirData(currentDate: any): void {
    const tempDropDownValues: { item_id: number; item_text: string; }[] = [];
    this.selectedDate = currentDate.format('YYYY-MM-DD');
    this.dataService.getWaterData(currentDate.format('YYYY-MM-DD')).subscribe(result => {
      if (result) {
        if (result.length > 0) {
          let i = 0;
          for (const key in result[0]) {
            if (key.includes('Per')) {
              const element = result[0][key];
              const rname = key.replace('Per', '');
              this.chartData.push({
                name: rname,
                value: element,
                id: rname + '-' + 'reservoir'
              })
              tempDropDownValues.push({
                item_id: i,
                item_text: rname
              })
              i++;
            }

            if (key === 'modified') {
              const element = result[0][key];
              this.lastUpdated = element;
            }
          }
        } else if (result.length === 0) {
          this.isEmpty = true;
        }
      }
      this.dropdownList = tempDropDownValues;

      this.chartData.sort((a, b) => a.name.localeCompare(b.name));
      this.chartResultData = this.chartData;
      setTimeout(() => {
        this.createReservoirChart();
      }, 100);

    }, (error) => {
      console.log(error);
      this.isError = true;
    }, () => {
      this.isError = false;
    })
  }

  createReservoirChart(): void {
    if (this.chartArray.length > 0) {
      this.chartArray.forEach(element => {
        element.dispose();
      });
    }
    this.chartArray = [];
    this.chartResultData.forEach((element, index) => {
      const chartElement = document.getElementById(element.id)
      const chart = echarts.init(chartElement!);
      this.chartArray.push(chart);
      const option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Reservoir Water Level',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}%',
              fontSize: 20
            },
            axisLabel: {
              formatter: '{value}%',
              fontSize: 10
            },
            data: [{
              name: element.name,
              value: element.value
            }]
          }
        ]
      };
      this.chartArray[index].setOption(option, true);
    });
  }

  onItemSelect(item: any) {
    this.chartResultData = [];
    const temp: ChartData[] = [];
    this.chartData.forEach(element => {
      this.selectedItems.forEach(element2 => {
        if (element2.item_text === element.name) {
          temp.push(element);
        }
      });
    });
    this.chartResultData = temp;
    setTimeout(() => {
      this.createReservoirChart();
    }, 100);
  }

  onItemDeSelect(item: any) {
    this.chartResultData = [];
    let temp: ChartData[] = [];
    if (this.selectedItems.length > 0) {
      this.chartData.forEach(element => {
        this.selectedItems.forEach(element2 => {
          if (element2.item_text === element.name) {
            temp.push(element);
          }
        });
      });
    } else if (this.selectedItems.length === 0) {
      temp = this.chartData;
    }
    this.chartResultData = temp;
    setTimeout(() => {
      this.createReservoirChart();
    }, 100);
  }

  onSelectAll(items: any) {
    this.chartResultData = [];
    this.chartResultData = this.chartData
    setTimeout(() => {
      this.createReservoirChart();
    }, 100);
  }

  dateSelected(event: any): void {
    this.chartResultData = [];
    this.chartData = [];
    this.getReservoirData(moment(event.target.value));
  }
}
