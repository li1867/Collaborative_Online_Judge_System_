import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({  //可以被注入的
  providedIn: 'root'  //providedIn: 提供给哪个component
})

export class DataService {
  private _problemSource = new BehaviorSubject<Problem[]>([]);//希望可以拿到problem的一个数组
  
  constructor(private httpClient: HttpClient) { }

  getProblems(): Observable <Problem[]> {
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {
        this._problemSource.next(res);
      })
      .catch(this.handleError);

      return this._problemSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> { //given the problem id, and return the right problem. 
    return this.httpClient.get(`api/v1/problems/${id}`) //这个单引号可以做一个string的处理
      .toPromise()
      .then((res: any) => res)
      .catch(this.handleError);
  }

  addProblem(problem: Problem){
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.post('api/v1/problems', problem, options)
    .toPromise()
    .then((res: any) => {
      this.getProblems();

      return res;
    })  
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.body || error);
  }
}
