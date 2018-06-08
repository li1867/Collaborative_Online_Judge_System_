import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problems';

@Injectable({  //可以被注入的
  providedIn: 'root'  //providedIn: 提供给哪个component
})

export class DataService {
  problems: Problem[] = PROBLEMS;
  constructor() { }

  getProblems(): Problem[] {
    return this.problems;
  }

  getProblem(id: number): Problem{ //given the problem id, and return the right problem. 
    return this.problems.find( (problem) => problem.id === id);
  }

  addProblem(problem: Problem){
    problem.id = this.problems.length + 1;
    this.problems.push(problem);  
  }
}
