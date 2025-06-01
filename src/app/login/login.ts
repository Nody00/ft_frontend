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
    console.log('dinov log email', this.email.value);
    console.log('dinov log password', this.password.value);

    this.httpClient
      .post('http://localhost:3000/auth/sign-in', {
        email: this.email.value,
        password: this.password.value,
      })
      .subscribe({
        next: (response) => {
          // access_token
          console.log('dinov log response', response);
        },
        error: (error) => {
          console.error(error);
          this.formError.set(true);
          this.emailError.set('Invalid email!');
          this.passwordError.set('Invalid password!');
        },
      });
  }
}
