import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { Router, RouterLink } from '@angular/router';
import { ProjectSkeletonComponent } from '../../../shared/components/project-skeleton/project-skeleton.component';
import { EmptyProjectComponent } from '../../../shared/components/empty-project/empty-project.component';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-project',
  imports: [
    DatePipe,
    RouterLink,
    ProjectSkeletonComponent,
    EmptyProjectComponent,
    PaginationComponent
],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
  standalone: true,
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  paginatedProjects: any[] = [];

  currentPage = 1;
  pageSize = 6;

  loading: boolean = false;
  errMsg: string = '';

  private projectService = inject(ProjectService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.loading = true;

    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res;
        this.updatePagination();
        console.log(res);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errMsg = err.error.message;
      },
    });
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedProjects = this.projects.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  
}
