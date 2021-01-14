import {IndividualSelfAdaption} from './model';
import {Random} from './shared';
import {FitnessFirstMethode} from './fitness';

export class FirstPopulationSelfAdaption {
  generationSize: number;
  chromosomeLength: number;

  constructor( generationSize: number, chromosomeLength: number) {
    this.generationSize = generationSize;
    this.chromosomeLength = chromosomeLength;
  }

  createFirstGeneration(): Array<IndividualSelfAdaption> {
    let newGeneration = new Array<IndividualSelfAdaption>();

    for(let i=0; i<this.generationSize; i++) {
      let individual = new IndividualSelfAdaption([], 0,0);
      for(let t=0; t<this.chromosomeLength; t++) {
        individual.value.push(new Random().getRandomInt(1000, 9999)/10000);
      }
      individual.sigma = new Random().getRandomInt(1000, 9999)/10000;
      individual.fitness = new FitnessFirstMethode().computeFitness(individual, this.chromosomeLength);

      newGeneration.push(individual);
    }
    return newGeneration;
  }
}
