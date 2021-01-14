import {Random} from './shared';
import {IndividualSelfAdaption} from './model';

export class Individual {
  constructor(value: Array<number>, fitness: number) {
    this.value = value;
    this.fitness = fitness;
  }
  value: Array<number>;
  fitness: number;
}


export class SUSSelect {
  generation: Array<Individual>;
  cumulativeSumOfFitness: Array<number>;
  totalFitness: number;

  constructor(generation: Array<Individual> | Array <IndividualSelfAdaption>) {
    this.totalFitness = 0;
    this.generation = generation;
    this.cumulativeSumOfFitness = new Array<number>();

    this.generation.sort((a,b) => (a.fitness < b.fitness) ? 1 : -1);
    for(let i=0; i<generation.length; i++) {
      this.totalFitness = this.totalFitness + generation[i].fitness;
      this.cumulativeSumOfFitness.push(this.totalFitness);
    }
  }

  handleSUS(amountOfRandomNumber: number): Array<Individual> | Array<IndividualSelfAdaption> {
    let rand = new Random();
    let selectedIndexList = new Array<Individual | IndividualSelfAdaption>();
    selectedIndexList.push(this.generation[0]);
    let rand1 = rand.getRandomInt(0, this.cumulativeSumOfFitness[0]);
    let step = this.totalFitness / amountOfRandomNumber;

    for(let i=1; i<amountOfRandomNumber; i++) {
      for(let t=0; t<this.cumulativeSumOfFitness.length; t++) {
        if(this.cumulativeSumOfFitness[t] < i*step+rand1 && this.cumulativeSumOfFitness[t+1] > i*step+rand1){
          selectedIndexList.push(this.generation[t]);
        }
      }
    }

    return selectedIndexList;
  }


}


export class SUSSelect2 {
  generation: Array<IndividualSelfAdaption>;
  cumulativeSumOfFitness: Array<number>;
  totalFitness: number;

  constructor(generation: Array <IndividualSelfAdaption>) {
    this.totalFitness = 0;
    this.generation = generation;
    this.cumulativeSumOfFitness = new Array<number>();

    this.generation.sort((a,b) => (a.fitness < b.fitness) ? 1 : -1);
    for(let i=0; i<generation.length; i++) {
      this.totalFitness = this.totalFitness + generation[i].fitness;
      this.cumulativeSumOfFitness.push(this.totalFitness);
    }
  }

  handleSUS(amountOfRandomNumber: number): Array<IndividualSelfAdaption> {
    let rand = new Random();
    let selectedIndexList = new Array<IndividualSelfAdaption>();
    selectedIndexList.push(this.generation[0]);
    let rand1 = rand.getRandomInt(0, this.cumulativeSumOfFitness[0]);
    let step = this.totalFitness / amountOfRandomNumber;

    for(let i=1; i<amountOfRandomNumber; i++) {
      for(let t=0; t<this.cumulativeSumOfFitness.length; t++) {
        if(this.cumulativeSumOfFitness[t] < i*step+rand1 && this.cumulativeSumOfFitness[t+1] > i*step+rand1){
          selectedIndexList.push(this.generation[t]);
        }
      }
    }

    return selectedIndexList;
  }


}
