import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  data = {
    name: 'Toto Gómez',
    email: 'toto@yopmail.com',
    age: 80
  }
  ngOnInit() {
  }
}
