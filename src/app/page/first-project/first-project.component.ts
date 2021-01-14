import { Component, OnInit } from '@angular/core';
import {FirstProjectServiceService} from '../../service/first-project-service.service';
import {SelfAdaptionService} from '../../service/self-adaption.service';
import {FirstPopulationSelfAdaption} from '../../model/firstPopulationSelfAdaption';
import {RouletteWheelSelection} from '../../model/select';
import {Individual, SUSSelect, SUSSelect2} from '../../model/susSelection';
import {SelfAdaptionMutation} from '../../model/selfAdaption';
import {IndividualSelfAdaption} from '../../model/model';
import {NormalDistribute} from '../../model/shared';
import {FirstPopulation} from '../../model/firstPopulation';
import {oneDividedFiveRole} from '../../model/OneDividedFiveRole';

@Component({
  selector: 'app-first-project',
  templateUrl: './first-project.component.html',
  styleUrls: ['./first-project.component.scss']
})
export class FirstProjectComponent implements OnInit {

  NValueQ1: number;
  popSizeQ1: number;
  sigma1: number;

  select: string;
  method: string;

  numberOfParent: number;
  numberOfGeneration: number;

  bestResult: Array<number>;

  constructor(private service: FirstProjectServiceService, private serviceSelfAdaption: SelfAdaptionService) { }

  ngOnInit(): void {
  }

  testOneDivideFive() {
    this.bestResult = new Array<number>();

    let generation = new FirstPopulation().createFirstPup(this.popSizeQ1, this.NValueQ1);
    let role = new oneDividedFiveRole(this.NValueQ1, this.sigma1);
    let roulette = new RouletteWheelSelection(generation);

    for(let i=0; i<this.numberOfGeneration; i++) {
      let parent =  roulette.handleRouletteWheel(this.numberOfParent);
      for(let t=0; t < parent.length; t++) {
        generation.push(role.createChildWithOneDividedFiveRole(parent[t]));
      }
      console.log(this.getBestResult(generation));
      roulette = new RouletteWheelSelection(generation);
      generation = roulette.handleRouletteWheel(this.popSizeQ1);
    }
  }

  testSelfAdaption() {
    this.bestResult = new Array<number>();

    let generation = new FirstPopulationSelfAdaption(this.popSizeQ1, this.NValueQ1).createFirstGeneration();
    let self = new SelfAdaptionMutation(generation, this.NValueQ1);
    let sus = new SUSSelect2(generation);

    for(let i=0; i<this.numberOfGeneration; i++) {

      let parent =  sus.handleSUS(this.numberOfParent);
      for(let t=0; t<this.numberOfParent; t++) {
        generation.push(self.handleMutationSelfAdaption(parent[t]));
      }
      sus = new SUSSelect2(generation);
      this.getBestResult(generation)

    }

    console.log(this.bestResult);
  }

  getBestResult(generation: Array<Individual>): number {
    let res = 0;
    for(let i=0; i<generation.length; i++) {
      if(generation[i].fitness > res) res = generation[i].fitness;
    }
    return res;
  //  this.bestResult.push(1000- res);
  }

  startProject() {
    if(this.method == 'self'){
    } else if(this.method == 'exact') {
      this.startFirstQuestionByExactRelation();
    }
    else {
      this.startFirstQuestionByOnePerFive();
    }
  }

  startFirstQuestionByOnePerFive() {
    this.service.initOneOfFiveRole();
    this.service.setDataQ1(this.popSizeQ1, this.NValueQ1, this.sigma1);
    this.service.createFirstPup(this.popSizeQ1, this.NValueQ1);

    if(this.select == 'tournament') {
      for(let i=0; i<this.numberOfGeneration; i++) {
        this.service.callTournamentSelection();
        this.service.goNextGenerationByTournamentSelection();
        this.service.updateSigmaByOnePerFive();
        this.service.initOneOfFiveRole();
      }
    }

    else if(this.select == 'rolt') {
      for(let i=0; i<this.numberOfGeneration; i++) {
        this.service.callRouletteSelectionForParent();
        this.service.goNextGenerationByRouletteSelection();
        this.service.updateSigmaByOnePerFive();
        this.service.initOneOfFiveRole();
      }
    }
    else {
      for(let i=0; i<this.numberOfGeneration; i++) {
        this.service.callSUSSelection();
        this.service.goNextGenerationByTournamentSelection();
        this.service.updateSigmaByOnePerFive();
        this.service.initOneOfFiveRole();
      }
    }
  }

  startFirstQuestionByExactRelation() {
    this.service.initOneOfFiveRole();
    this.service.setDataQ1(this.popSizeQ1, this.NValueQ1, this.sigma1);
    this.service.createFirstPup(this.popSizeQ1, this.NValueQ1);

    if(this.select == 'tournament'){
      for(let i=0; i<this.numberOfGeneration; i++) {
        this.service.callTournamentSelection();
        this.service.goNextGenerationByTournamentSelection();
        this.service.updateSigmaExactRelation();
      }
    }
  }

}
