import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class Login {
  authService = inject(AuthService);
  httpClient = inject(HttpClient);
  showPassword = signal(false);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  emailError = signal('');
  passwordError = signal('');
  formError = signal(false);

  onBlurEmail() {
    if (this.email.hasError('required')) {
      this.emailError.set('Enter a valid email');

      return;
    }

    if (this.email.hasError('email')) {
      this.emailError.set('Enter a valid email');
      return;
    }

    this.emailError.set('');
  }

  onBlurPassword() {
    if (this.password.hasError('required')) {
      this.passwordError.set('Password is required');
      return;
    }

    if (this.password.hasError('minlength')) {
      this.passwordError.set('Min length of 8 chars is required!');
      return;
    }

    this.passwordError.set('');
  }

  togglePassword = (event: MouseEvent) => {
    this.showPassword.set(!this.showPassword());
    event.stopPropagation();
  };

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.email.value && this.password.value) {
      this.authService.login(this.email.value, this.password.value).subscribe({
        next: () => {
          console.log('Login sucessfull!');
        },
        error: (err) => {
          console.error('Login component error:', err);
          this.emailError.set('Invalid email');
          this.passwordError.set('Invalid password');
          this.email.reset();
          this.password.reset();
          this.formError.set(true);
        },
      });
    }
  }
}
