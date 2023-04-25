import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { NotificationService } from '../../service/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: FormGroup;
  public btnIsDisabled: boolean = false;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private route: Router
  ) {
    this.form = this.fb.group({
      login: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async handleLogin() {
    if (!this.btnIsDisabled) {
      console.log('oi');
      return;
    }

    try {
      this.isLoading = true;
      this.btnIsDisabled = false;
      const response = await this.authService.login(
        '/auth/login',
        this.form.value
      );
      this.authService.setUserAndToken(response);
      this.route.navigate(['/home']);
    } catch (error: any) {
      const { message } = error.error;
      console.log(error.error);
      this.notification.message({ message });
      this.form?.setValue({ login: '', password: '' });
      return;
    } finally {
      this.isLoading = false;
      this.btnIsDisabled = false;
    }
  }

  getReference(field: string): AbstractControl {
    return this.form.controls[field];
  }

  statusBtn(event: any): boolean {
    return (this.btnIsDisabled =
      !event && !!this.form?.value?.login && !!this.form?.value?.password);
  }
}
