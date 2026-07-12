import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { InputComponent } from '../../../../shared/ui/input/input.component';

@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonComponent,
    CardComponent,
    InputComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  standalone: true,
})
export class SignInComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private platformId: Object = inject(PLATFORM_ID);

  hidePassword = true;
  loading: boolean = false;
  serverError: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],

    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]+$/,
        ),
      ],
    ],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.loading = true;

    this.authService.signIn(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
          this.authService.userInfo();

          this.router.navigate(['/projects']);
        }
      },

      error: (err) => {
        this.serverError = err.error?.msg || 'Login failed';
        console.log(err.error?.msg);

        this.loading = false;
      },
    });
  }

  get password() {
    return this.form.controls.password.value ?? '';
  }
}
