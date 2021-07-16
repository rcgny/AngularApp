import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aa-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public pageTitle = 'Welcome';
  constructor() { }

  ngOnInit(): void {
  }

}
