import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone: true,
})
export class ResetPasswordComponent {
  accessToken = '';
  success = false;
  error: string | null = null;

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.accessToken =
      this.route.snapshot.queryParamMap.get('access_token') || '';
    console.log(this.accessToken);
  }

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  hidePassword = true;
  hideConfirmPassword = true;
  loading: boolean = false;
  serverError: string | null = null;

  resetForm = this.fb.group(
    {
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

  resetPassword() {
    if (this.resetForm.invalid) return;

    this.loading = true;

    this.authService.updatePassword(this.resetForm.value.password!).subscribe({
      next: () => {
        this.success = true;
        this.toastr.success('Password updated successfully. Redirecting to login...', 'Success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },

      error: () => {
        this.error = 'Unable to update password.';
      },
    });
  }

  get password() {
    return this.resetForm.controls.password.value ?? '';
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
