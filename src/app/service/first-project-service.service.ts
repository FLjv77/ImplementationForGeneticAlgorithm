import { Injectable } from '@angular/core';
import {ModelQ1, RoltSelect} from '../model/model';
import {RouletteWheelSelection} from '../model/select';
import {NormalDistribute, Random} from '../model/shared';

@Injectable({
  providedIn: 'root'
})
export class FirstProjectServiceService {
  constructor() { }

  bestFitness: Array<number>;

  casePositive: number;
  caseNegative: number;
  sizeGeneration1: number;
  sizeGeneration2: number;
  sizeGeneration3: number;
  numberOfParent: number;

  NQ1: number;
  NQ2: number;
  NQ3: number;

  sigma1: number;
  sigma2: number;
  sigma3: number;

  numberOfHoleGeneration: number;

  public generation: Array<ModelQ1>;
  parentGeneration: Array<ModelQ1>;

  setNumberOfParent(num) {
    this.numberOfParent = num;
  }
  setNumberOfHoleGeneration(num) {
    this.numberOfHoleGeneration = num;
  }

  setDataQ1(size, n, sigma) {
    this.sizeGeneration1 = size;
    this.NQ1 = n;
    this.sigma1 = sigma;
  }
  setDataQ2(size, n, sigma) {
    this.sizeGeneration2 = size;
    this.NQ2 = n;
    this.sigma2 = sigma;
  }
  setDataQ3(size, n, sigma) {
    this.sizeGeneration3 = size;
    this.NQ3 = n;
    this.sigma3 = sigma;
  }

  getBestFitnessOfGeneration(){
    let res = 0;
    for(let i=0; i<this.generation.length; i++) {
      if(this.generation[i].fitness > res) res = this.generation[i].fitness;
    }
    this.bestFitness.push(res);
    if(res > this.bestFitness[0]) this.bestFitness[0]=res;
  }

  createFirstPup(size: number, N: number) {
    this.bestFitness = new Array<number>();
    this.bestFitness[0] =0;

    this.generation = new Array<ModelQ1>();
    for(let i=0; i<size; i++) {
      let individual = new Array<number>();

      for(let t=0; t<N; t++) {
        individual.push((new Random().getRandomInt(1000, 9999)) /1000);
      }
      this.generation.push(new ModelQ1(individual, this.computeFitnessQ1(individual, N)));
    }
  }

  computeFitnessQ1(individual: Array<number>, N: number): number {
    let q1 = 10*N;
    for(let i=0; i<N; i++) {
      q1 = q1 + Math.pow(individual[i],2) - 10 * Math.cos(2 * Math.PI * individual[i]);
    }
    //1000  max value
    return q1;
  }


  callSUSSelection() {
/*    let sus = new SUSSelect();
    sus.susInit(this.generation);

    console.log(sus.susExecute(20));*/
  }

  callRouletteSelectionForParent() {
/*    let roulette = new RouletteWheelSelection();
    roulette.rouletteWheelInit(this.generation);

    for(let i=0; i<10; i++) {
      this.createChildWithOneFromFiveRole(roulette.rouletteWheelExecute());
    }*/
  }

  goNextGenerationByRouletteSelection() {
/*    let roulette = new RouletteWheelSelection();
    roulette.rouletteWheelInit(this.generation);

    let tempGeneration = new Array<ModelQ1>();
    for(let i=0; i<this.sizeGeneration1; i++){
      let index = roulette.rouletteWheelExecute();
      tempGeneration.push(this.generation[index]);
    }
    this.getBestFitnessOfGeneration();

    this.generation = new Array<ModelQ1>();
    this.generation = tempGeneration;*/
  }

  goNextGenerationByTournamentSelection() {
/*    let tournament = new TournamentSelection(this.generation);

    let tempGeneration = new Array<ModelQ1>();
    for(let i=0; i<this.sizeGeneration1; i++){
      let index = tournament.tournamentExecute();
      tempGeneration.push(this.generation[index]);
    }
    this.getBestFitnessOfGeneration();

    this.generation = new Array<ModelQ1>();
    this.generation = tempGeneration;*/
  }

  callTournamentSelection() {
/*    let tournament = new TournamentSelection(this.generation);
    for(let i=0; i<10; i++) {
      console.log(tournament.tournamentExecute());
    }*/
  }

  initOneOfFiveRole() {
    this.caseNegative = 0;
    this.casePositive = 0;
  }

  createChildWithOneFromFiveRole(index: number) {
    let child = new Array<number>();
    for(let i=0; i<this.generation[index].value.length; i++) {
      child.push((new NormalDistribute().normalDistribution(0, this.sigma1)) + this.generation[index].value[i]);
    }
    let newFitness = this.computeFitnessQ1(child, this.NQ1);
    if(newFitness > this.generation[index].fitness) this.casePositive++;
    else this.caseNegative++;
    this.generation.push(new ModelQ1(child, newFitness));
  }

  updateSigmaByOnePerFive() {
    if(this.casePositive / (this.casePositive + this.caseNegative) > 1/5) this.sigma1 = this.sigma1/=0.9;
    else if(this.casePositive / (this.casePositive + this.caseNegative) < 1/5) this.sigma1 = this.sigma1*=0.9;
  }

  updateSigmaExactRelation() {
    this.sigma1 = this.sigma1*(1-((this.bestFitness.length-1)/this.numberOfHoleGeneration))
  }
}
