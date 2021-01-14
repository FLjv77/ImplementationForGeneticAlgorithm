
import {IndividualSelfAdaption} from './model';
import {Individual} from './tournamentSelection';

export class FitnessSecondMethode {
  _a: number;
  _b: number;
  _c: number;
  constructor() {
    this._a = 1;
    this._b = 1;
    this._c = 1;
  }
  computeFitness(individual: Individual | IndividualSelfAdaption, chromosomeLength: number): number {
    let sigma1 = 0;
    let sigma2 = 0;
    let fitness;

    for(let i=0; i<chromosomeLength; i++) {
      sigma1+=(individual.value[i]* individual.value[i]);
      sigma2+=(Math.cos(this._c * individual.value[i]));
    }

    fitness= -1 * this._a * Math.exp(-1 * this._b * Math.sqrt(sigma1/chromosomeLength)) - Math.exp(sigma2/chromosomeLength) + this._a + Math.exp(1);
    return 50 - fitness;
  }
}

export class FitnessFirstMethode {
  constructor() {}

  computeFitness (individual: Individual, chromosomeLength: number): number {
    let fitness = 10 * chromosomeLength;

    for(let i=0; i< chromosomeLength; i++) {
      if(individual.value[i] > 5.12 || individual.value[i]<-5.12) fitness+=10 * individual.value[i] * individual.value[i];
      else if(individual.value[i] < 5.12 && individual.value[i]>-5.12) fitness += individual.value[i] * individual.value[i]-10 * Math.cos(2 * Math.PI * individual.value[i]);
    }

    return 10000 - fitness;
  }
}

export class FitnessThirdMethod {
  constructor() {}

  computeFitness(individual: Individual | IndividualSelfAdaption, chromosomeLength: number): number {
    let fitness = 10*chromosomeLength;
    for(let i=0; i<chromosomeLength; i++) {
      fitness = fitness + Math.pow(individual.value[i],2) - 10 * Math.cos(2 * Math.PI * individual.value[i]);
    }
    return 1000 - fitness;
  }
}
