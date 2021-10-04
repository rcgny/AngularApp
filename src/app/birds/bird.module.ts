import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirdListComponent } from './bird-list.component';
import { BirdDetailComponent } from './bird-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BirdListComponent,
    BirdDetailComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ]
})
export class BirdModule { }
