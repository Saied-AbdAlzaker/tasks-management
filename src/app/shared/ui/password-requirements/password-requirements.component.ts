import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface PasswordRequirement {
  label: string;
  completed: boolean;
}

@Component({
  selector: 'app-password-requirements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-requirements.component.html',
  styleUrl: './password-requirements.component.scss',
})
export class PasswordRequirementsComponent {
  @Input() title = 'Password requirements';

  @Input({ required: true })
  requirements: PasswordRequirement[] = [];
}
