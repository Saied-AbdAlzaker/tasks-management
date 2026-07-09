import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  standalone: true,
})
export class SignUpComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  hidePassword = true;
  hideConfirmPassword = true;
  loading: boolean = false;
  serverError: string | null = null;

  form = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^(?!.*\s{2,})[\p{L}]+(?:\s[\p{L}]+)*$/u),
        ],
      ],

      email: ['', [Validators.required, Validators.email]],

      jobTitle: [''],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]+$/,
          ),
        ],
      ],

      confirmPassword: ['', Validators.required],
    },
    {
      validators: this.passwordMatchValidator,
    },
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;

    return password === confirm ? null : { passwordMismatch: true };
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      email: this.form.value.email,
      password: this.form.value.password,

      data: {
        name: this.form.value.name,
        job_title: this.form.value.jobTitle,
      },
    };

    this.loading = true;

    this.authService.signUp(payload).subscribe({
      next: (res: any) => {
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
        }
        this.router.navigate(['/login']);
      },

      error: (err) => {
        this.serverError = err.error?.msg || 'Registration failed';

        this.loading = false;
      },
    });
  }

  get password() {
    return this.form.controls.password.value ?? '';
  }
  get hasMinLength(): boolean {
    return this.password.length >= 8;
  }
  get hasUpperLowerNumber(): boolean {
    return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(this.password);
  }

  get hasSpecialChar(): boolean {
    return /(?=.*[!@#$%^&*])/.test(this.password);
  }
}
