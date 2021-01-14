import { Injectable } from '@angular/core';
import {NormalDistribute, Random} from '../model/shared';
import {RouletteWheelSelection} from '../model/select';

@Injectable({
  providedIn: 'root'
})
export class SelfAdaptionService {
  generationSize: number;
  chromosomeLength: number;
  bestFitness: Array<number>;

  constructor() {}
/*
  setSize(size: number) {
    this.generationSize = size;
  }
  setChromosomeLength(length: number) {
    this.chromosomeLength = length;
  }

  createFirstGeneration() {
    this.bestFitness = new Array<number>();
    this.bestFitness[0] =0;
    this.generation = new Array<SelfAdaption>();

    for(let i=0; i<this.generationSize; i++) {
      let values = new Array<number>();
      for(let t=0; t<this.chromosomeLength; t++) {
        values.push(new Random().getRandomInt(1000, 9999)/1000);
      }
      let sigma = new Random().getRandomInt(1000, 9999)/1000;
      let fitness = this.computeFitnessQ1(values);

      this.generation.push(new SelfAdaption(values, fitness, sigma));
    }
  }

  getBestFitnessOfGeneration() {
    let res = 0;
    for(let i=0; i<this.generation.length; i++) {
      if(this.generation[i].fitness > res) res = this.generation[i].fitness;
    }
    this.bestFitness.push(res);
    if(res > this.bestFitness[0]) this.bestFitness[0]=res;
  }

  computeFitnessQ1(values: Array<number>): number {
    let q1 = 10 * values.length;
    for(let i=0; i < this.chromosomeLength; i++) {
      q1 = q1 + Math.pow(values[i],2) - 10 * Math.cos(2 * Math.PI * values[i]);
    }
    //1000  max value
    return 1000 - q1;
  }

  computeFitnessQ2(values: Array<number>): number {
    let a=2;
    let b=3;
    let c=4;

    let sigma1 = 0;
    let sigma2 = 0;
    let q2;

    for(let i=0; i<values.length; i++) {
      sigma1+=(values[i]*values[i]);
      sigma2+=(Math.cos(c*values[i]));
    }

    q2= -1 * a * Math.exp(-1 * b * Math.sqrt(sigma1/values.length)) - Math.exp(sigma2/values.length) + a + Math.exp(1);
    return q2;
  }


  computeFitnessQ3 (values: Array<number>): number {
    let q3= 10 * values.length;

    for(let i=0; i< values.length; i++) {
      if(values[i] > 5.12 || values[i]<-5.12) q3+=10*values[i]*values[i];
      else if(values[i] < 5.12 && values[i]>-5.12) q3+=values[i]*values[i]-10*Math.cos(2*Math.PI*values[i]);
    }

    return q3;
  }



  selectParentByRouletteWhile() {
    let roulette = new RouletteWheelSelection();
    roulette.rouletteWheelInit(this.generation);

    if(new Random().getRandomInt(0,10) == 5) {
      this.recombinationSingle(roulette.rouletteWheelExecute(), roulette.rouletteWheelExecute());
    }
    else {
      for(let i=0; i<10; i++) {
        this.createChild(roulette.rouletteWheelExecute());
      }
    }
  }

  recombinationSingle(index1: number, index2: number) {
    let rand = new Random().getRandomInt(0, this.chromosomeLength);
    let child1 = this.generation[index1];
    let child2 = this.generation[index2];

    child1.values[rand] = (child1.values[rand] + child2.values[rand]) /2;
    child2.values[rand] = (child1.values[rand] + child2.values[rand]) /2;

    child1.fitness = this.computeFitnessQ1(child1.values);
    child2.fitness = this.computeFitnessQ1(child2.values);
    this.generation.push(child1);
    this.generation.push(child2);
  }

  recombinationSimple(index1: number, index2: number) {
    let rand = new Random().getRandomInt(0, this.chromosomeLength);
    let child1 = this.generation[index1];
    let child2 = this.generation[index2];

    for(let i=rand; i<this.chromosomeLength; i++) {
      child1.values[i] = child2.values[i] = (this.generation[index1].values[i]+this.generation[index2].values[i])/2;
    }
    child1.fitness = this.computeFitnessQ1(child1.values);
    child2.fitness = this.computeFitnessQ1(child2.values);
    this.generation.push(child1);
    this.generation.push(child2);
  }

  recombinationWhole(index1: number, index2: number) {
    let child = this.generation[index1];

    for(let i=0; i<this.chromosomeLength; i++) {
      child.values[i] = (this.generation[index1].values[i]+this.generation[index2].values[i])/2;
    }
    child.fitness = this.computeFitnessQ1(child.values);
    this.generation.push(child);
  }

  createChild(index: number) {
    let child = new Array<number>();
    let newSigma = new NormalDistribute().normalDistribution(0, this.generation[index].sigma) + this.generation[index].sigma;

    for(let i=0; i<this.generation[index].values.length; i++) {
      child.push((new NormalDistribute().normalDistribution(0, newSigma)) + this.generation[index].values[i]);
    }
    let newFitness = this.computeFitnessQ1(child);
    this.generation.push(new SelfAdaption(child, newFitness, newSigma));
  }

  goNextGenerationByRouletteWhile() {
    let roulette = new RouletteWheelSelection();
    roulette.rouletteWheelInit(this.generation);
    let generationTemp = new Array<SelfAdaption>();

    for(let i=0; i<this.generationSize; i++) {
      let index = roulette.rouletteWheelExecute();
      generationTemp.push(this.generation[index]);
    }

    this.getBestFitnessOfGeneration();

    this.generation = new Array<SelfAdaption>();
    this.generation = generationTemp;
  }

  test() {
    console.log(this.bestFitness);
  }*/
}
