import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project/project.service';
import { finalize } from 'rxjs';
import { CreateProject } from '../../interfaces/project/project';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule, BreadcrumbComponent],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private projectService = inject(ProjectService);

  loading = false;
  project: any;

  projectId!: string;
  projectName!: string;
  breadcrumbItems: BreadcrumbItem[] = [];

  projectForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],

    description: ['', Validators.maxLength(500)],
  });

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;

    this.getProject();
  }

  getProject() {
    this.loading = true;

    this.projectService
      .getProjectById(this.projectId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.project = res[0];
          console.log(res);
          this.projectForm.patchValue({
            name: this.project.name,
            description: this.project.description,
          });

          // breadcrumb
          this.breadcrumbItems = [
            {
              label: 'PROJECTS',
              url: '/',
            },
            {
              label: this.project.name,
            },
            {
              label: 'EDIT',
            },
          ];
        },
      });
  }

  save() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    this.projectService
      .updateProject(
        this.projectId,
        this.projectForm.getRawValue() as CreateProject,
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.toastr.success('Project updated successfully');

          this.router.navigate(['/projects']);
        },

        error: () => {
          this.toastr.error('Failed to update project');
        },
      });
  }

  cancel() {
    this.router.navigate(['/projects']);
  }
}
