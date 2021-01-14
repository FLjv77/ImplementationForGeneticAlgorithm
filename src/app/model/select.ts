import {Generation, IndividualSelfAdaption, ModelQ1, RoltSelect} from './model';
import {Random} from './shared';
import {Individual} from './susSelection';

export class RouletteWheelSelection {
  _generation: Array<Individual | IndividualSelfAdaption>;
  _rouletteSelect: Array<number>;

  constructor(generation: Array<Individual | IndividualSelfAdaption>) {
    this._generation = generation;
    this._rouletteSelect = new Array<number>();
    let res =0;

    for(let i=0; i<generation.length; i++) {
      res = res + generation[i].fitness;
      this._rouletteSelect.push(res);
    }
  }


  handleRouletteWheel(numberOfSelection: number): Array<Individual | IndividualSelfAdaption> {
    let selectedIndividual: Array<Individual | IndividualSelfAdaption>;
    selectedIndividual = new Array<Individual | IndividualSelfAdaption>();

    for(let t=0; t<numberOfSelection; t++) {
      let rand =  new Random().getRandomInt(0, this._rouletteSelect[this._generation.length-1]);
      for(let i=0; i<this._rouletteSelect.length; i++) {
        if(rand >= this._rouletteSelect[i] && rand < this._rouletteSelect[i+1]) {
          selectedIndividual.push(this._generation[i]);
          break
        }
      }
    }

    return selectedIndividual;
  }
}
