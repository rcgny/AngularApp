 import { Component, OnInit , OnDestroy} from '@angular/core';
 import { Subscription } from 'rxjs';
import { IBird } from './bird';
import {BirdService } from './bird.service';

@Component({
  selector: 'aa-bird-list',
  templateUrl: './bird-list.component.html',
  styleUrls: ['./bird-list.component.css']
})
export class BirdListComponent implements OnInit, OnDestroy {
  // public
  pageTitle: string = 'Bird List';
  showImage: boolean = false;
  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string = '';
  sub!: Subscription;

  private _listFilter: string = '';

  // get, set  listFilter() called in the bird-list.component.html which uses listFilter
  get listFilter(): string {
    return this._listFilter;
  }
  
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredBirds = this.performFilter(value);
  }

  filteredBirds: IBird[] = [];
  birds: IBird[] = [];  

  constructor(private birdService: BirdService) { }

  performFilter(filterBy: string): IBird[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.birds.filter((bird: IBird) =>
      bird.name.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.birdService.getBirds().subscribe({
      next: birds => {
        this.birds = birds;
        this.filteredBirds = this.birds;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
