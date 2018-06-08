//点击界面上可以跳链到另一个界面

import { Routes, RouterModule } from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'problems',
        pathMatch: 'full'
    },
    {
        path: 'problems', //如果和path match，direct到component里面
        component: ProblemListComponent
    },
    {
        path: 'problems/:id',
        component: ProblemDetailComponent
    },
    {
        path: '**',  //无效路径
        redirectTo: 'problems'
    }
];

export const routing = RouterModule.forRoot(routes);
