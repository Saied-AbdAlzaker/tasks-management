import { DatePipe } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { Router, RouterLink } from '@angular/router';
import { ProjectSkeletonComponent } from '../../../shared/components/project-skeleton/project-skeleton.component';
import { EmptyProjectComponent } from '../../../shared/components/empty-project/empty-project.component';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-project',
  imports: [
    DatePipe,
    RouterLink,
    ProjectSkeletonComponent,
    EmptyProjectComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
  standalone: true,
})
export class ProjectComponent {
  projects: any[] | null = [];
  loading: boolean = false;
  errMsg: string | null = null;

  error = false;

  currentPage = 1;
  limit = 6;

  totalCount = 0;
  totalPages = 0;

  isMobile = window.innerWidth < 1024;

  private projectService = inject(ProjectService);
  private router = inject(Router);
  private toast = inject(ToastrService);

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.loading = true;
    this.error = false;

    this.projectService
      .getProjects()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.projects = response.body
          console.log(response);
        },

        error: (err) => {
          this.error = true;
          console.log(err);
        },
      });
  }

  // Scroll data
  @HostListener('window:scroll')
  onScroll() {
    if (!this.isMobile) return;

    if (this.loading) return;

    if (this.currentPage >= this.totalPages) return;

    const position = window.innerHeight + window.scrollY;

    const height = document.body.offsetHeight;

    if (position >= height - 200) {
      this.currentPage++;

      this.getAllProjects();
    }
  }

  //
  openProject(id: string) {
    this.router.navigate(['/projects', id, 'epics']);
  }
}
