import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Contact', url: '/contact', icon: 'book' },
    { title: 'About', url: '/details', icon: 'clipboard' },
  ];
  constructor() {}
}
