import {Random} from './shared';
import {RouletteWheelSelection} from './select';
import {SUSSelect} from './susSelection';
import {IndividualSelfAdaption} from './selfAdaption';

export class Individual {
  constructor(value: Array<number>, fitness: number) {
    this.value = value;
    this.fitness = fitness;
  }
  value: Array<number>;
  fitness: number;
}

export class TournamentSelection {
  constructor(generation: Array<Individual | IndividualSelfAdaption>) {
    this.generation = generation;
  }
  generation: Array<Individual | IndividualSelfAdaption>;
  selectedIndividual: Array<Individual | IndividualSelfAdaption>;
  individualInNet: Array<Individual | IndividualSelfAdaption>;

  handleTournament(sizeOfNet: number, amountOfNumber: number): Array<Individual | IndividualSelfAdaption> {
    this.individualInNet = new Array<Individual | IndividualSelfAdaption>();
    this.selectedIndividual = new Array<Individual | IndividualSelfAdaption>();

    for(let i=0; i<sizeOfNet; i++) {
      this.individualInNet.push(this.generation[new Random().getRandomInt(0, this.generation.length)]);
    }

    let roulette = new RouletteWheelSelection(this.individualInNet);
    this.selectedIndividual = roulette.handleRouletteWheel(amountOfNumber);

    return this.selectedIndividual;
  }
}
