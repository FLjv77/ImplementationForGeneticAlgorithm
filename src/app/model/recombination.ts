import {Random} from './shared';
import {Individual} from './susSelection';
import {FitnessFirstMethode} from './fitness';

export class RecombinationSingle {
  chromosomeLength: number;
  alfa: number;

  constructor(chromosomeLength: number, alfa: number) {
    this.chromosomeLength = chromosomeLength;
    this.alfa = alfa;
  }

  handleRecombinationSingle(parent1: Individual, parent2: Individual): Array<Individual> {
    let rand = new Random().getRandomInt(0, this.chromosomeLength);
    let child = new Array<Individual>();

    child.push(parent1);
    child.push(parent2);

    child[0].value[rand] = (parent1[0].value[rand] * this.alfa) + (parent2[1].value[rand] * (1 - this.alfa));
    child[1].value[rand] = (parent1[0].value[rand] * this.alfa) + (parent2[1].value[rand] * (1 - this.alfa));


    child[0].fitness = new FitnessFirstMethode().computeFitness(child[0], this.chromosomeLength);
    child[1].fitness = new FitnessFirstMethode().computeFitness(child[1], this.chromosomeLength);

    return child;
  }
}


export class RecombinationSimple {
  chromosomeLength: number;
  alfa: number;

  constructor(chromosomeLength: number, alfa: number) {
    this.chromosomeLength = chromosomeLength;
    this.alfa = alfa;
  }

  handleRecombinationSimple(parent1: Individual, parent2: Individual): Array<Individual> {
    let rand = new Random().getRandomInt(0, this.chromosomeLength);
    let child = new Array<Individual>();

    child.push(parent1);
    child.push(parent2);

    for(let i=rand; i<this.chromosomeLength; i++) {
      child[0].value[i] = child[1].value[i] = (parent1.value[i] * this.alfa) + (parent2.value[i] * (1 - this.alfa));
    }

    child[0].fitness = new FitnessFirstMethode().computeFitness(child[0], this.chromosomeLength);
    child[1].fitness = new FitnessFirstMethode().computeFitness(child[0], this.chromosomeLength);

    return child;
  }

}

export class RecombinationWhole {
  chromosomeLength: number;
  alfa: number;

  constructor(chromosomeLength: number, alfa: number) {
    this.chromosomeLength = chromosomeLength;
    this.alfa = alfa;
  }

  handleRecombinationWhole(parent1: Individual, parent2: Individual): Array<Individual> {

    //در این مدل فرزندان اول و دوم مشابه خواهد بود پس فقط یکی میفرستیم
    let child = new Array<Individual>();

    for(let i=0; i<this.chromosomeLength; i++) {
      child[0].value[i] = (parent1.value[i] * this.alfa) + (parent2.value[i] * (1 - this.alfa));
    }

    child[0].fitness = new FitnessFirstMethode().computeFitness(child[0], this.chromosomeLength);

    return child;
  }


}
