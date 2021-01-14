export class Chromosome {
  constructor() {
  }
  existenceOfItem: Array<number>;
  fitness: number;
  possibility: number;
  isDelete: boolean;
}

export class Appliance {
  constructor(m, v) {
    this.massive = m;
    this.value = v;
  }
  massive: number;
  value: number;
}

export class Generation {
  constructor() {
    this.maxFitness = new Chromosome();
    this.maxFitness.fitness = 0;
    this.totalFitness = 0;
  }
  population: Array<Chromosome>;
  maxFitness: Chromosome;
  totalFitness: number;
}

export class GenerationResponse {
  constructor(responseChromosome: Chromosome, total: number) {
    this.response = responseChromosome;
    this.totalFitness = total;
  }
  response: Chromosome;
  totalFitness: number;
}

export class Parent {
  constructor(num1 , num2) {
    this.parent1 = num1;
    this.parent2 = num2;
  }
  parent1: number;
  parent2: number;
}



export class ModelQ1 {
  constructor(value: Array<number>, fitness: number) {
    this.value = value;
    this.fitness = fitness;
  }
  value: Array<number>;
  fitness: number;
}

export class RoltSelect {
  constructor() {
    this.totalFitness=0;
    this.fitnessList = new Array<number>();
  }
  fitnessList: Array<number>;
  totalFitness: number;
}

export class IndividualSelfAdaption {
  constructor(values, fitness, sigma) {
    this.fitness = fitness;
    this.sigma = sigma;
    this.value = values;
  }
  value: Array<number>;
  fitness: number;
  sigma: number;
}
