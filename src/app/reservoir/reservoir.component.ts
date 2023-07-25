import { Component, OnInit, Output } from '@angular/core';
import { DataService } from './service/data.service';
import * as echarts from 'echarts';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
export class ReservoirComponent implements OnInit{
  reservoirChart: any;
  chartData: ChartData[] = [];
  chartResultData: ChartData[] = [];
  lastUpdated: string = '';
  chartArray:any[] = [];
  searchString = '';
  dropdownList: { item_id: number; item_text: string; }[] = [];
  selectedItems: { item_id: number; item_text: string; }[] = [];
  dropdownSettings: IDropdownSettings;

  constructor(private dataService: DataService){
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
    this.dataService.getWaterData().subscribe(result => {
      if(result && result.values.length > 0) {
        const values = result.values;
        const tempDropDownValues: { item_id: number; item_text: string; }[] = [];
        values.forEach((element, index) => {
          if(index > 4) {
            this.chartData.push({
              name: element[2],
              value: element[7],
              id: element[2] + '-' + 'reservoir'
            })
            tempDropDownValues.push({
              item_id: index,
              item_text: element[2]
            })
          }
        });
        this.dropdownList = tempDropDownValues;
        this.chartData.sort((a, b) => a.name.localeCompare(b.name));
        this.chartResultData = this.chartData;
        let updatedData = values[2][0].split('Please')[0].replace('\n', '');
        const finalUpdatedData = updatedData.split(' ');
        this.lastUpdated = finalUpdatedData[0].split('\n')[0] + ' ' + finalUpdatedData[1] + ' ' + finalUpdatedData[2];
        /* this.dropdownList = [
          { item_id: 1, item_text: 'Mumbai' },
          { item_id: 2, item_text: 'Bangaluru' },
          { item_id: 3, item_text: 'Pune' },
          { item_id: 4, item_text: 'Navsari' },
          { item_id: 5, item_text: 'New Delhi' }
        ];
        this.selectedItems = [
          { item_id: 3, item_text: 'Pune' },
          { item_id: 4, item_text: 'Navsari' }
        ]; */
        
        setTimeout(() => {   
          this.createReservoirChart(); 
        }, 100);  
      }
    });
  }

  ngAfterViewInit(): void {    
    
  }

  createReservoirChart(): void {
    if(this.chartArray.length > 0) {
      this.chartArray.forEach(element => {
        element.dispose();
      });
    }
    this.chartArray = [];
    this.chartResultData.forEach((element,index) => {
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
      this.chartArray[index].setOption(option,true);
    });
  }

  onItemSelect(item: any) {
    /* this.selectedItems.push(item); */
    this.chartResultData = [];
    const temp:ChartData[] = [];
    this.chartData.forEach(element => {
      this.selectedItems.forEach(element2 => {
        if(element2.item_text === element.name) {
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
    if(this.selectedItems.length > 0) {
      this.chartData.forEach(element => {
        this.selectedItems.forEach(element2 => {
          if(element2.item_text === element.name) {
              temp.push(element);
          }
        });
      });
    } else if(this.selectedItems.length === 0) {
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
}
