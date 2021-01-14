import {ModelQ1} from './model';
import {NormalDistribute, Random} from './shared';
import {Individual} from './susSelection';
import {TournamentSelection} from './tournamentSelection';
import {FitnessFirstMethode} from './fitness';
import {FirstPopulation} from './firstPopulation';
import {RecombinationSimple} from './recombination';
import {oneDividedFiveRole} from './OneDividedFiveRole';

export class main {

  // از کاربر میگیریم اینا رو
  generationRepetition: number;
  sizePopulation: number;
  chromosomeLength: number;
  numberOfParent: number;
  sigma: number;

  bestFitnessIndividualInAllGeneration: Individual;
  bestFitnessList: Array<Individual>;

  constructor() {}

  DoTrain() {
    let generation = new FirstPopulation().createFirstPup(this.sizePopulation, this.chromosomeLength);
    let oneDividedFive = new oneDividedFiveRole(this.chromosomeLength, this.sigma);

    for(let i=0; i<this.generationRepetition; i++) {
      //انتخاب والدین
      let parents = this.choseParent(this.numberOfParent, generation);
      for(let t=0; t<this.numberOfParent; t++) {
        let rand = new Random().getRandomInt(0,10);
        if(rand == 5) {
          // ایجاد فرزند با ترکیب

          let childes = new RecombinationSimple(this.chromosomeLength, 0.5).handleRecombinationSimple(parents[t], parents[t+1]);
          generation.push(childes[0]);
          generation.push(childes[1]);
        }
        else {
          // ایجاد فرزند با جهش

          let childes = oneDividedFive.createChildWithOneDividedFiveRole(parents[t]);
          generation.push(childes);
        }
      }


      // انتخاب بازماندگان
      this.choseNewGeneration(generation);


      // به روز رسانی مقدار سیگما واسه قانون 1/5
      oneDividedFive.updateSigmaByOnePerFive();
    }
  }

  choseParent(numberOfParent: number, generation: Array<Individual>): Array<Individual> {
    let parent = new Array<Individual>();
    let tournamentSelection = new TournamentSelection(generation);
    parent = tournamentSelection.handleTournament(numberOfParent);
    return parent;
  }

  choseNewGeneration(generation: Array<Individual>): Array<Individual> {
    let newGeneration = new Array<Individual>();
    let tournamentSelection = new TournamentSelection(generation);
    newGeneration = tournamentSelection.handleTournament(this.sizePopulation);
    return newGeneration;
  }
}
