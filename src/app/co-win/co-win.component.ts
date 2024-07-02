import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { CoWinService } from './co-win.service';
import { stateResponse, stateMap } from './response.model';
import { stateAbbr } from './state-list';


@Component({
  selector: 'app-co-win',
  templateUrl: './co-win.component.html',
  styleUrls: ['./co-win.component.scss']
})
export class CoWinComponent {
  title = 'tracker';

  delta:any[] = [];
  delta7:any[] = [];
  totalConfirmed:any[] = [];
  totalDeceased:any[] = [];
  totalRecovered:any[] = [];
  totalTested:any[] = [];
  totalVaccinated:any[] = [];
  totalVaccinated2:any[] = [];

  countryMap:stateResponse = {}
  stateMap:stateMap = {result : []};
  states:string[] = []
  selectedState: string = "Maharashtra";

  constructor (private cowinService: CoWinService) {
  }
  myChart: any;
  ngOnInit(): void {
    this.stateMap = stateAbbr;
    this.cowinService.getAllStates().subscribe((result) => {
      this.countryMap = result;
      this.populateChartData('MH');
      this.createChart();
    })

  }

  populateChartData(stateAbbr:string){

    let temp = Object.entries(this.countryMap)

    temp.forEach((element:any,index) => {
      if(element[0] === stateAbbr) {
        const tempDateArray = Object.entries(element[1]['dates']);
        tempDateArray.forEach((element2:any,index2) => {
          if(element2[1].total?.confirmed !== undefined)
          this.totalConfirmed[index2] = [element2[0], element2[1].total?.confirmed];

          if(element2[1].total?.deceased !== undefined)
          this.totalDeceased[index2] = [element2[0], element2[1].total?.deceased];

          if(element2[1].total?.recovered !== undefined)
          this.totalRecovered[index2] = [element2[0], element2[1].total?.recovered];

          if(element2[1].total?.tested !== undefined)
          this.totalTested[index2] = [element2[0], element2[1].total?.tested];

          if(element2[1].total?.vaccinated1 !== undefined)
          this.totalVaccinated[index2] = [element2[0], element2[1].total?.vaccinated1];

          if(element2[1].total?.vaccinated2 !== undefined)
          this.totalVaccinated2[index2] = [element2[0], element2[1].total?.vaccinated2];
        });
      }
    });

    this.stateMap.result.forEach(element => {
      this.states.push(element.State)
    });
  }

  clearData() {
    this.totalConfirmed = [];
    this.totalDeceased = [];
    this.totalRecovered = [];
    this.totalTested = [];
    this.totalVaccinated = [];
    this.totalVaccinated2 = [];
  }

  switchStates(state:string){
    this.myChart.dispose();
    this.stateMap.result.forEach(element => {
      if(element.State === state)
      {
        this.clearData();
        this.selectedState = state;
        this.populateChartData(element.Abbreviation);
        this.createChart();
      }
    });

  }

  createChart(){
    var element = document.getElementById('main');

    this.myChart = echarts.init(element!, 'dark');

    const dates = this.totalTested.map(function (item) {
      return item[0];
    });

    this.myChart.setOption({
      legend: {
        data: ['Confirmed', 'Deceased', 'Recovered', 'Tested', 'Vaccination 1', 'Vaccination 2'],
        inactiveColor: '#777',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
          type: 'cross',
          lineStyle: {
            color: '#376df4',
            width: 2,
            opacity: 1,
          },
        },
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: '#8392A5' } },
        name: 'Dates'
      },
      yAxis: {
        scale: true,
        axisLine: { lineStyle: { color: '#8392A5' } },
        splitLine: { show: false },
        name: 'Total Cases'
      },
      textStyle : {
        fontFamily : 'monospace'
      },
      grid: {
        left: 80,
        right: 50
      },
      dataZoom: [
        {
          textStyle: {
            color: '#8392A5',
          },
          handleIcon:
            'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          dataBackground: {
            areaStyle: {
              color: '#8392A5',
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5',
            },
          },
          brushSelect: true,
        },
        {
          type: 'inside',
        },
      ],
      series: [
        {
          name: 'Confirmed',
          type: 'line',
          data: this.totalConfirmed,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
        {
          name: 'Deceased',
          type: 'line',
          data: this.totalDeceased,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
        {
          name: 'Recovered',
          type: 'line',
          data: this.totalRecovered,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
        {
          name: 'Tested',
          type: 'line',
          data: this.totalTested,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
        {
          name: 'Vaccination 1',
          type: 'line',
          data: this.totalVaccinated,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
        {
          name: 'Vaccination 2',
          type: 'line',
          data: this.totalVaccinated2,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
      ],
    });
  }
}
