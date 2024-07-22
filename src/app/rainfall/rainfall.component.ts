import { Component } from '@angular/core';
import { RainfallService } from './service/rainfall.service';
import * as echarts from 'echarts';
import * as moment from 'moment';

@Component({
  selector: 'app-rainfall',
  templateUrl: './rainfall.component.html',
  styleUrls: ['./rainfall.component.scss'],
})
export class RainfallComponent {
  myChart: any;
  dates: string[] = [];
  selectedDate = '';
  allData: any[] = [];
  date = moment().format('MMM DD, YYYY');
  current: any;
  currentCondition: any;
  max: any;
  showData = false;
  error = false;

  constructor(private rainfall: RainfallService) {}

  ngAfterViewInit(): void {
    this.rainfall.getCurrentWeather().subscribe((result) => {
      this.current = result.current;
      this.max = result.forecast.forecastday[0].day;
      this.currentCondition = result.current.condition;
      this.allData = result.forecast.forecastday[0].hour;
      this.showData = true;
      this.createChart();
    }, () => {
      this.showData = true;
      this.error = true;
    });
  }

  createChart(): void {
    const directionMap: any = {};
    // prettier-ignore
    ['W', 'WSW', 'SW', 'SSW', 'S', 'SSE', 'SE', 'ESE', 'E', 'ENE', 'NE', 'NNE', 'N', 'NNW', 'NW', 'WNW'].forEach(function (name, index) {
        directionMap[name] = Math.PI / 8 * index;
    });
    const dims = {
      time: 0,
      windSpeed: 1,
      R: 2,
      waveHeight: 3,
      weatherIcon: 2,
      minTemp: 3,
      maxTemp: 4,
    };
    const arrowSize = 18;
    const weatherIconSize = 45;
    const renderArrow = function (param: any, api: any) {
      const point = api.coord([
        api.value(dims.time),
        api.value(dims.windSpeed),
      ]);
      return {
        type: 'path',
        shape: {
          pathData: 'M31 16l-15-15v9h-26v12h26v9z',
          x: -arrowSize / 2,
          y: -arrowSize / 2,
          width: arrowSize,
          height: arrowSize,
        },
        rotation: directionMap[api.value(dims.R)],
        position: point,
        style: api.style({
          stroke: '#555',
          lineWidth: 1,
        }),
      };
    };
    const data = this.allData.map((entry) => {
      return [entry.time, entry.wind_kph, entry.wind_dir, entry.temp_c];
    });

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          return [
            'Time: ' + params[0].value[0],
            'Wind Speed: ' + params[0].value[1] + ' kph',
            'Wind Direction: ' + params[0].value[2],
            'Temperature: ' + params[0].value[3] + '°',
          ].join('<br>');
        },
      },
      xAxis: {
        type: 'time',
        splitLine: {
          lineStyle: {
            color: '#ddd',
          },
        },
        axisLabel: {
          interval: 1,
        },
      },
      grid: {
        left: 47,
        right: 45,
      },
      yAxis: [
        {
          name: 'Temperature',
          nameLocation: 'middle',
          nameGap: 35,
          axisLine: {
            lineStyle: {
              color: '#666',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#ddd',
            },
          },
        },
        {
          name: 'Windspeed',
          nameLocation: 'middle',
          nameGap: 35,
          axisLine: {
            lineStyle: {
              color: '#666',
            },
          },
          splitLine: { show: false },
        },
        {
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: 0,
          minSpan: 5,
        },
        {
          type: 'slider',
          xAxisIndex: 0,
          minSpan: 5,
        },
      ],
      series: [
        {
          type: 'line',
          yAxisIndex: 1,
          showSymbol: false,
          emphasis: {
            scale: false,
          },
          symbolSize: 10,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              global: false,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(88,160,253,1)',
                },
                {
                  offset: 0.5,
                  color: 'rgba(88,160,253,0.7)',
                },
                {
                  offset: 1,
                  color: 'rgba(88,160,253,0)',
                },
              ],
            },
          },
          lineStyle: {
            color: 'rgba(88,160,253,1)',
          },
          itemStyle: {
            color: 'rgba(88,160,253,1)',
          },
          encode: {
            x: 0,
            y: 3,
          },
          data: data,
          z: 2,
        },
        {
          type: 'custom',
          renderItem: renderArrow,
          encode: {
            x: 0,
            y: 1,
          },
          data: data,
          z: 10,
        },
        {
          type: 'line',
          symbol: 'none',
          encode: {
            x: 0,
            y: 1,
          },
          lineStyle: {
            color: '#aaa',
            type: 'dotted',
          },
          data: data,
          z: 1,
        },
      ],
    };

    var element = document.getElementById('main');

    this.myChart = echarts.init(element);
    this.myChart.setOption(option);
  }

  dateSelected(val: any): void {}
}
