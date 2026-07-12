import { Component, inject, OnInit } from '@angular/core';
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
import { InputComponent } from '../../../../shared/ui/input/input.component';
import { PasswordRequirementsComponent } from "../../../../shared/ui/password-requirements/password-requirements.component";
import { CardComponent } from "../../../../shared/ui/card/card.component";

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, InputComponent, PasswordRequirementsComponent, CardComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone: true,
})
export class ResetPasswordComponent implements OnInit{
  accessToken = '';
  success = false;
  // error: string | null = null;

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.accessToken =
      this.route.snapshot.queryParamMap.get('access_token') || '';
    console.log(this.accessToken);

    this.changeRequiremntsPassword()
  }

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  hidePassword = true;
  hideConfirmPassword = true;
  loading: boolean = false;
  serverError: string | null = null;

  passwordRequirements = [
    {
      label: 'At least 8 characters',
      completed: false,
    },
    {
      label: 'One uppercase, one lowercase and one number',
      completed: false,
    },
    {
      label: 'One special character',
      completed: false,
    },
  ];

  resetForm = this.fb.nonNullable.group(
    {
      password: [
        '',
        [
          Validators.required,
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
        this.toastr.success(
          'Password updated successfully. Redirecting to login...',
          'Success',
        );
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },

      error: () => {
        this.serverError = 'Unable to update password.';
      },
    });
  }

  changeRequiremntsPassword() {
    this.resetForm.get('password')?.valueChanges.subscribe((password) => {
      this.passwordRequirements = [
        {
          label: 'At least 8 characters',
          completed: password?.length >= 8,
        },
        {
          label: 'One uppercase, one lowercase and one number',
          completed: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password),
        },
        {
          label: 'One special character',
          completed: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        },
      ];
    });
  }

  // get password() {
  //   return this.resetForm.controls.password.value ?? '';
  // }
  // get hasMinLength(): boolean {
  //   return this.password.length >= 8;
  // }
  // get hasUpperLowerNumber(): boolean {
  //   return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(this.password);
  // }

  // get hasSpecialChar(): boolean {
  //   return /(?=.*[!@#$%^&*])/.test(this.password);
  // }
}
