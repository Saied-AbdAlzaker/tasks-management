import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
})
export class InputComponent {
  @Input() control!: AbstractControl | any;

  @Input() label = '';

  @Input() placeholder = '';

  @Input() type = 'text';

  @Input() icon = '';

  @Input() hint = '';

  @Input() optional = false;

  @Input() showPasswordToggle = false;

  hidePassword = true;

  get inputType() {
    if (this.type !== 'password') return this.type;

    return this.hidePassword ? 'password' : 'text';
  }
}
