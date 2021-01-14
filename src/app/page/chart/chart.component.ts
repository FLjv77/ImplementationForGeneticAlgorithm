import { Component, OnInit } from '@angular/core';
import {Color, Label} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';
import {FunctionService} from '../../service/function.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(public functionService: FunctionService) { }

  /*chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Max fitness each generation'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Fitness',
        data: [0]
      }
    ]
  });*/


  ngOnInit(): void {
/*    for(let i=0; i<this.functionService.generation; i++) {
      let data = this.functionService.resultGeneration[i].response.fitness;
      // @ts-ignore
      this.chart.addPoint(data);
    }*/
  }

}
