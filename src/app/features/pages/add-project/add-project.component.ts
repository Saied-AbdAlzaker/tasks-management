import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ProjectService } from '../../services/project/project.service';
import { CreateProject } from '../../interfaces/project/project';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbItem, BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, BreadcrumbComponent],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent {
  loading: boolean = false;
  serverError: string | null = null;

  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private router = inject(Router);
  private toast = inject(ToastrService);

  projectForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],

    description: ['', [Validators.maxLength(500)]],
  });

  submit() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
    };

    this.loading = true;

    this.projectService
      .createProject(payload as CreateProject)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.projectForm.reset();
          this.toast.success('Project created successfully');
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          this.serverError =
            err.error?.message ||
            'An error occurred while creating the project.';
        },
      });
  }
  // breadcrumb
   breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'PROJECTS',
      url: '/'
    },
    {
      label: 'ADD NEW PROJECT'
    }
  ];
}
