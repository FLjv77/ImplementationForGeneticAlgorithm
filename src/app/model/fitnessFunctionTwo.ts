import {Individual} from './tournamentSelection';
import {IndividualSelfAdaption} from './model';

export class FitnessFirstMethode{
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
