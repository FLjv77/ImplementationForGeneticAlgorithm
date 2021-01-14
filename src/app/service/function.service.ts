import { Injectable } from '@angular/core';
import {Appliance, Chromosome, Generation, GenerationResponse} from '../model/model';
import {Chart} from 'angular-highcharts';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  public maxCapacity: number;
  public sizeOfPopulation: number;
  public mutation: number;
  public generation: number;
  public finalAns: Chromosome;

  public applianceList: Array<Appliance>;
  public currentGeneration: Generation;
  public resultGeneration: Array<GenerationResponse>;
  public fitNessRouletteWheel: Array<number>;
  public showChart: boolean;

  constructor() {
    this.finalAns = new Chromosome();
    this.finalAns.fitness = 0;

    this.resultGeneration = new Array<GenerationResponse>();
  }

  creatFirstGeneration() {
    this.currentGeneration = new Generation();
    this.currentGeneration.population = new Array<Chromosome>();
    for(let i = 0; i < this.sizeOfPopulation; i++) {
      let chrom = new Chromosome();
      chrom.existenceOfItem = new Array<number>();
      for(let t = 0; t < this.applianceList.length; t++) {
        chrom.existenceOfItem.push(this.getRandomInt(2));
      }
      this.setFitness(chrom);
    }
  }

  setSizeOfPopulation(size: number) {
    this.sizeOfPopulation = size;
  }

  setNumberGeneration(size: number) {
    this.generation = size;
  }

  setMutation(size: number) {
    this.mutation = size;
  }

  setMaxCapacity(capacity: number) {
    this.maxCapacity = capacity;
  }


  setPossibility() {
    for(let i=0; i<this.currentGeneration.population.length; i++) {
      this.currentGeneration.population[i].possibility =
        Math.floor((this.currentGeneration.population[i].fitness / this.currentGeneration.totalFitness) * 10000);
    }
  }
  setFitness(item: Chromosome) {
    let fitness = 0;
    let wight = 0;
    for (let i = 0; i < this.applianceList.length; i++) {
      fitness = fitness + (this.applianceList[i].value * item.existenceOfItem[i]);
      wight = wight + (this.applianceList[i].massive * item.existenceOfItem[i]);
    }
/*    if(wight >= this.maxCapacity){
      item.fitness = 0;
      item.isDelete = true;
    }
    else {
      item.fitness = fitness;
      item.isDelete = false;
      this.currentGeneration.population.push(item);
      this.currentGeneration.totalFitness += fitness;
      if (fitness > this.currentGeneration.maxFitness.fitness) this.currentGeneration.maxFitness = item;
    }*/

    item.isDelete = false;
    if(wight >= this.maxCapacity){
      fitness = 0;
      item.isDelete = true;
    }

    item.fitness = fitness;
    this.currentGeneration.population.push(item);
    this.currentGeneration.totalFitness += fitness;
    if (fitness > this.currentGeneration.maxFitness.fitness) this.currentGeneration.maxFitness = item;

    /// also can use unless 0 for fitness try it
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandomFromRoulette(): number {
    return this.getRandomInt(this.fitNessRouletteWheel.length);
  }

  createRouletteWheel() {
    this.fitNessRouletteWheel = new Array<number>();
    for(let i = 0; i < this.currentGeneration.population.length; i++) {
      for(let t = 0; t < this.currentGeneration.population[i].possibility; t++) {
        this.fitNessRouletteWheel.push(i);
      }
    }
  }

  setBestResultOfGeneration() {
    let result = new GenerationResponse(this.currentGeneration.maxFitness, this.currentGeneration.totalFitness);
    if(this.currentGeneration.maxFitness.fitness > this.finalAns.fitness) this.finalAns = this.currentGeneration.maxFitness;
    this.chart.addPoint(this.currentGeneration.maxFitness.fitness);
    this.resultGeneration.push(result);
  }

  choseParent() {
    this.createRouletteWheel();
    for(let i =0; i< this.sizeOfPopulation; i++){
      let i1 = this.fitNessRouletteWheel[this.getRandomFromRoulette()];
      let i2 = this.fitNessRouletteWheel[this.getRandomFromRoulette()];
      this.createChild(i1, i2);
      this.createChild(i1, i2);
    }
  }

  createChild(index1: number , index2: number) {
    let child = new Chromosome();
    child.existenceOfItem = new Array<number>();
    let c1 = this.getRandomInt(this.applianceList.length);
    let c2 = this.getRandomInt(this.applianceList.length);
    if(c1 > c2) {
      let t = c1;
      c1 = c2;
      c2 = t;
    }

    for(let i = 0; i <= c1; i++) {
      child.existenceOfItem.push(this.currentGeneration.population[index1].existenceOfItem[i]);
    }
    for(let i = c1+1; i <= c2; i++) {
      child.existenceOfItem.push(this.currentGeneration.population[index2].existenceOfItem[i]);
    }
    for(let i = c2+1; i < this.applianceList.length; i++) {
      child.existenceOfItem.push(this.currentGeneration.population[index1].existenceOfItem[i]);
    }


    if(this.mutation > 0) {
      if(this.getRandomInt(1000)-1 < this.mutation) {
        child = this.creatMutation(child);
      }
    }

    this.setFitness(child);
  }

  creatMutation(c: Chromosome): Chromosome {
    for(let i =0; i< c.existenceOfItem.length; i++) {
      if(c.existenceOfItem[i] == 0) c.existenceOfItem[i] = 1;
      else c.existenceOfItem[i] = 0;
    }
    return c;
  }

  choseSurvivors() {
    this.createRouletteWheel();
    let newPopulation = new Array<Chromosome>();
    for(let i=0; i<this.sizeOfPopulation; i++) {
      let index = this.fitNessRouletteWheel[this.getRandomFromRoulette()];
      newPopulation.push(this.currentGeneration.population[index]);
    }
    this.currentGeneration = new Generation();
    this.currentGeneration.population = new Array<Chromosome>();
    this.currentGeneration.population = newPopulation;
    this.setGenerationInfo();
  }

  setGenerationInfo(){
    let maxFitness = new Chromosome();
    maxFitness.fitness = 0;
    let totalFitness = 0;
    for(let i=0; i<this.currentGeneration.population.length; i++) {
      if(this.currentGeneration.population[i].fitness > maxFitness.fitness) maxFitness = this.currentGeneration.population[i];
      totalFitness += this.currentGeneration.population[i].fitness;
    }
    this.currentGeneration.totalFitness = totalFitness;
    this.currentGeneration.maxFitness = maxFitness;
  }

  start() {
    this.resultGeneration = new Array<GenerationResponse>();

    this.creatFirstGeneration();
    this.setBestResultOfGeneration();

    for(let i = 0; i< this.generation; i++) {
      this.setPossibility();
      this.choseParent();
      this.setPossibility();
      this.choseSurvivors();
      this.setBestResultOfGeneration();
      console.log(this.currentGeneration.maxFitness.fitness);
    }
    console.log(this.finalAns);

    this.showChart = true;
  }

  public chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Max fitness each generation'
    },
    credits: {
      enabled: false
    }
  });
}
