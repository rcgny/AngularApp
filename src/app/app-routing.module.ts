import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirdDetailComponent } from './birds/bird-detail.component';
import { BirdListComponent } from './birds/bird-list.component';
import { WelcomeComponent } from './home/welcome.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome'
  },
  {
    path: 'birds',
    component: BirdListComponent
  },
  {
    path: 'birds/:id',
    component: BirdDetailComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
