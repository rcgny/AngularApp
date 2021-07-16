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
  pageTitle: string = 'Bird List';
  showImage: boolean = false;
  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string = '';
  sub!: Subscription;

  birds: IBird[] = [];
  filteredBirds: IBird[] = [];

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredBirds = this.performFilter(value);
  }

  constructor(private birdService: BirdService) { }

  performFilter(filterBy: string): IBird[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.birds.filter((bird: IBird) =>
      bird.birdName.toLocaleLowerCase().includes(filterBy));
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
