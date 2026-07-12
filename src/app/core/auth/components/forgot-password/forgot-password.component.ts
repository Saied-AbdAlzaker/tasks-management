import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from "../../../../shared/ui/input/input.component";

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, InputComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  standalone: true,
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  serverError: string | null = null;
  loading = false;
  success = false;

  remainingSeconds = 300;
  canResend = false;
  resendCount = 0;
  private interval?: any;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit() {
    if (this.form.invalid) return;

    this.loading = true;

    this.authService.forgotPassword(this.form.value.email).subscribe({
      next: (res: any) => {
        this.success = true;

        this.startTimer();

        this.loading = false;
      },
      error: (err: any) => {
        this.success = true;

        this.startTimer();

        this.loading = false;
        this.serverError = err.error?.msg || 'An error occurred. Please try again.';
      },
    });
  }

  startTimer() {
    this.canResend = false;

    this.remainingSeconds = 300;

    clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.remainingSeconds--;

      if (this.remainingSeconds <= 0) {
        clearInterval(this.interval);

        this.canResend = true;
      }
    }, 1000);
  }

  resend() {
    if (!this.canResend) return;

    if (this.resendCount >= 3) return;

    this.resendCount++;

    this.submit();
  }
}
