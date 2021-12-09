import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { show, hide } from 'src/store/loading/loading.actions';
import { login, recoverPassword } from 'src/store/login/login.actions';
import { MenuController, ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form: FormGroup;
  loginStateSubscription: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.menu.enable(false);
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store
      .select('login')
      .subscribe((loginState) => {
        this.onHasRecoveredPassword(loginState);

        this.onIsLoggedIn(loginState);

        this.onError(loginState);
        this.toggleLoadingState(loginState);
      });
  }

  ngOnDestroy() {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggleLoadingState(loginState: LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.router.navigate(['tabs']);
    }
  }

  private async onHasRecoveredPassword(loginState: LoginState) {
    if (loginState.hasRecoveredPassword) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Recovery email Sent',
        color: 'primary',
        duration: 2000,
      });
      toaster.present();
    }
  }

  private async onError(loginState: LoginState) {
    if (loginState.error) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger',
        duration: 2000,
      });
      toaster.present();
    }
  }

  forgotPassword() {
    this.store.dispatch(
      recoverPassword({ email: this.form.get('email').value })
    );
  }

  login() {
    this.store.dispatch(
      login({
        email: this.form.get('email').value,
        password: this.form.get('password').value,
      })
    );
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  register() {
    this.router.navigate(['register']);
  }
}
