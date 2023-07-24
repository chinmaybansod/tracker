import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';
import * as echarts from 'echarts';

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
  lastUpdated: string = '';
  chartArray:any[] = [];

  constructor(private dataService: DataService){
  }

  ngOnInit(): void {
    
    this.dataService.getWaterData().subscribe(result => {
      if(result && result.values.length > 0) {
        const values = result.values;
        values.forEach((element, index) => {
          if(index > 3) {
            this.chartData.push({
              name: element[2],
              value: element[7],
              id: element[2] + '-' + 'reservoir'
            })
          }
        });
        this.chartData.sort((a, b) => a.name.localeCompare(b.name));
        let updatedData = values[2][0].split('Please')[0].replace('\n', '');
        const finalUpdatedData = updatedData.split(' ');
        this.lastUpdated = finalUpdatedData[0].split('\n')[0] + ' ' + finalUpdatedData[1] + ' ' + finalUpdatedData[2];
        setTimeout(() => {   
          this.createReservoirChart(); 
        }, 100);  
      }
    });
  }

  ngAfterViewInit(): void {    
    
  }

  createReservoirChart(): void {
    this.chartData.forEach((element,index) => {
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
}
