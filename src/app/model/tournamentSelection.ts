import {Random} from './shared';

export class Individual {
  constructor(value: Array<number>, fitness: number) {
    this.value = value;
    this.fitness = fitness;
  }
  value: Array<number>;
  fitness: number;
}

export class TournamentSelection {
  constructor(generation: Array<Individual>) {
    this.generation = generation;
  }
  generation: Array<Individual>;
  selectedIndividual: Array<Individual>;

  handleTournament(amountOfRandomNumber: number): Array<Individual> {
    this.selectedIndividual = new Array<Individual>();
    this.generation.sort((a,b) => (a.fitness > b.fitness) ? 1 : -1);
    let generationLength = this.generation.length;

    //به تعداد داده شده در ورودی تابع عدد رندوم انتخاب میکنیم
    for(let i=0; i<amountOfRandomNumber; i++) {
      let rand = new Random().getRandomInt(1,(generationLength-1)*(generationLength)/2);
      for(let i=0; i<=generationLength; i++) {
        if(rand > i*(i-1)/2 && rand < i*(i+1)/2){
          this.selectedIndividual.push(this.generation[i]);
          break;
        }
      }
    }

    return this.selectedIndividual;
  }
}
