import {NormalDistribute} from './shared';
import {Individual} from './susSelection';
import {FitnessFirstMethode} from './fitness';

export class oneDividedFiveRole {

  _chromosomeLength: number;
  _caseNegative: number;
  _casePositive: number;
  _sigma: number;
  constructor(chromosomeLength: number, sigma) {
    this._chromosomeLength = chromosomeLength;
    this._sigma = sigma;
  }

  createChildWithOneDividedFiveRole(individual: Individual): Individual {
    let child = new Individual([] , 0);
    for(let i=0; i<this._chromosomeLength; i++) {
      child.value.push((new NormalDistribute().normalDistribution(0, this._sigma)) + individual.value[i]);
    }
    child.fitness = new FitnessFirstMethode().computeFitness(child, this._chromosomeLength);
    if(child.fitness > individual.fitness) this._casePositive++;
    else this._caseNegative++;
    return child;
  }

  updateSigmaByOnePerFive() {
    if(this._casePositive / (this._casePositive + this._caseNegative) > 1/5) this._sigma = this._sigma/=0.9;
    else if(this._casePositive / (this._casePositive + this._caseNegative) < 1/5) this._sigma = this._sigma*=0.9;
  }

  initOneOfFiveRole() {
    this._casePositive = 0;
    this._caseNegative = 0;
  }
}
