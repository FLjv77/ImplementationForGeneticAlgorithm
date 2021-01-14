import {NormalDistribute} from './shared';
import {Individual} from './susSelection';
import {FitnessFirstMethode} from './fitness';

export class ExactRelationForSigma {

  _numberOfGenerationUntilNow: number;
  _numberOfTotalGenerations: number;
  _chromosomeLength: number;
  _sigma: number;
  constructor(chromosomeLength: number, sigma: number, numberOfTotalGenerations: number) {
    this._numberOfGenerationUntilNow=0;
    this._numberOfTotalGenerations = numberOfTotalGenerations;
    this._chromosomeLength = chromosomeLength;
    this._sigma = sigma;
  }

  handleCreateChildWithExactRelationForSigma(individual: Individual): Individual {
    let child = new Individual([] , 0);
    for(let i=0; i<this._chromosomeLength; i++) {
      child.value.push((new NormalDistribute().normalDistribution(0, this._sigma)) + individual.value[i]);
    }
    child.fitness = new FitnessFirstMethode().computeFitness(child, this._chromosomeLength);
    return child;
  }

  updateSigmaExactRelation() {
    this._sigma = this._sigma*(1-((this._numberOfGenerationUntilNow++)/this._numberOfTotalGenerations))
  }
}
