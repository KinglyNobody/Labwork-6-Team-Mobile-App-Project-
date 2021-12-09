import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { logout } from 'src/store/login/login.actions';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
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
  constructor(
    private router: Router,
    private menu: MenuController,
    private store: Store<AppState>
  ) {}

  onLogout() {
    this.store.dispatch(logout());
    this.router.navigate(['login']);
    this.menu.close();
    this.menu.enable(false);
  }
}
