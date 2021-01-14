import { Component, OnInit } from '@angular/core';
import {FunctionService} from '../../service/function.service';
import {Appliance} from '../../model/model';

@Component({
  selector: 'app-back-pack',
  templateUrl: './back-pack.component.html',
  styleUrls: ['./back-pack.component.scss']
})
export class BackPackComponent implements OnInit {


  constructor(public serviceFunction: FunctionService) { }

  ngOnInit(): void {
    this.serviceFunction.showChart = false;
  }


  getData() {
    this.serviceFunction.applianceList = new Array<Appliance>();
    let source: string;
    // @ts-ignore
    source = document.getElementById('data').value;
    let list;
    list = source.split('\n');
    for(let i=0; i+1 < list.length; i++) {
      let item = list[i];
      let obj = new Appliance(item.split(',')[0], item.split(',')[1]);
      this.serviceFunction.applianceList.push(obj);
    }

    // @ts-ignore
    let c = document.getElementById('MaxCapacity').value;

    // @ts-ignore
    let g = document.getElementById('NumberOfGeneration').value;

    // @ts-ignore
    let m = document.getElementById('PossibilityOfMutation').value;

    // @ts-ignore
    let s = document.getElementById('Sizeofpopulation').value;

    if(s && m && g && c && source) {
      this.serviceFunction.setMutation(m);
      this.serviceFunction.setMaxCapacity(c);
      this.serviceFunction.setNumberGeneration(g);
      this.serviceFunction.setSizeOfPopulation(s);

      this.serviceFunction.start();
    }
    else {
      window.alert('Please fill all data')
    }
  }
}
