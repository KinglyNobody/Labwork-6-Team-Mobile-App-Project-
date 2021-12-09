import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private router: Router, private menu: MenuController) {}

  ngOnInit() {
    this.menu.enable(false);
  }

  register() {
    this.router.navigate(['login']);
  }

  goBack() {
    this.router.navigate(['login']);
  }
}
