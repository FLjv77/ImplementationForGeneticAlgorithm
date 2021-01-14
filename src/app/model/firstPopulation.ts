import {Individual} from './susSelection';
import {Random} from './shared';
import {FitnessFirstMethode} from './fitness';

export class FirstPopulation {
  constructor() {}

  createFirstPup(sizePopulation: number, chromosomeLength: number): Array<Individual> {
    let generation = new Array<Individual>();
    for(let i=0; i<sizePopulation; i++) {
      let individual = new Individual([], 0);

      for(let t=0; t<chromosomeLength; t++) {
        individual.value.push(Math.random());
      }
      individual.fitness = new FitnessFirstMethode().computeFitness(individual, chromosomeLength);
      generation.push(individual);
    }

    return generation;
  }
}
