import {NormalDistribute} from './shared';
import {generateAnalysis} from '@angular/compiler-cli/src/ngtsc/indexer';
import {FitnessFirstMethode} from './fitness';
import {IndividualSelfAdaption} from './model';
import {Individual} from './susSelection';

export class SelfAdaptionMutation {
  _generation: Array<IndividualSelfAdaption>;
  _chromosomeLength: number;

  constructor(generation: Array<IndividualSelfAdaption>, chromosomeLength: number) {
    this._generation = generation;
    this._chromosomeLength = chromosomeLength;
  }

  handleMutationSelfAdaption(parent: IndividualSelfAdaption): IndividualSelfAdaption {
    let child = new IndividualSelfAdaption([], 0, 0);
      child.sigma = new NormalDistribute().normalDistribution(0, parent.sigma) + parent.sigma;

    for(let i=0; i<this._chromosomeLength; i++) {
      child.value.push((new NormalDistribute().normalDistribution(0, child.sigma)) + parent.value[i]);
    }
    child.fitness = new FitnessFirstMethode().computeFitness(child, this._chromosomeLength);

    return child;
  }



}
