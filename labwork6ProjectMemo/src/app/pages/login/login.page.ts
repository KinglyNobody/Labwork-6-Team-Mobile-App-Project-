import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { show, hide } from 'src/store/loading/loading.actions';
import {
  login,
  loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess,
} from 'src/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';
import { AuthService } from 'src/app/services/auth/auth.service';
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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store
      .select('login')
      .subscribe((loginState) => {
        this.onIsRecoveringPassword(loginState);
        this.onHasRecoveredPassword(loginState);

        this.onIsLoggingIn(loginState);
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

  private onIsRecoveringPassword(loginState: LoginState) {
    if (loginState.isRecoveringPassword) {
      this.authService
        .recoverEmailPassword(this.form.get('email').value)
        .subscribe(
          () => {
            this.store.dispatch(recoverPasswordSuccess());
          },
          (error) => this.store.dispatch(recoverPasswordFail({ error }))
        );
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
      });
      toaster.present();
    }
  }

  private onIsLoggingIn(loginState: LoginState) {
    if (loginState.isLoggingIn) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.authService.login(email, password).subscribe(
        (user) => {
          this.store.dispatch(loginSuccess({ user }));
        },
        (error) => {
          this.store.dispatch(loginFail({ error }));
        }
      );
    }
  }

  forgotPassword() {
    this.store.dispatch(recoverPassword());
  }

  login() {
    this.store.dispatch(login());
  }

  register() {
    this.router.navigate(['register']);
  }
}
