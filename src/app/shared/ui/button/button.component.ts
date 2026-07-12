import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'outline';

export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() variant: ButtonVariant = 'primary';

  @Input() size: ButtonSize = 'md';

  @Input() loading = false;

  @Input() disabled = false;

  @Input() fullWidth = false;

  get classes(): string {
    const variants = {
      primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',

      secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800',

      success: 'bg-green-600 hover:bg-green-700 text-white',

      danger: 'bg-red-600 hover:bg-red-700 text-white',

      warning: 'bg-amber-500 hover:bg-amber-600 text-white',

      outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',

      md: 'h-11 px-5 text-sm',

      lg: 'h-12 px-6 text-base',
    };

    return [
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-lg',
      'font-medium',
      'transition-all',
      'duration-300',
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-indigo-200',
      'disabled:opacity-60',
      'disabled:cursor-not-allowed',
      this.fullWidth ? 'w-full' : '',
      variants[this.variant],
      sizes[this.size],
    ].join(' ');
  }
}
