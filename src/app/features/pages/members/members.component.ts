import { Component, inject } from '@angular/core';
import { ProjectMembersService } from '../../services/projectMembers/project-members.service';
import { finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent {
  loading = false;
  error = false;
  projectName = 'Project Name';
  projectId!: string;
  members: any;
  userNamePhoto: any;

  projectMember!: string;
  breadcrumbItems: BreadcrumbItem[] = [];

  private projectMembersService = inject(ProjectMembersService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.parent?.paramMap.subscribe((params) => {
      this.projectId = params.get('projectId')!;

      console.log('Members:', this.projectId);

      this.getAllMembers();
    });
  }

  getAllMembers() {
    this.loading = true;
    this.error = false;

    this.projectMembersService
      .getProjectMembers(this.projectId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.members = res;
          console.log(this.members);
          this.userNamePhoto = res.map((m) => {
            m.metadata.name.slice(0, 2).toUpperCase();
            console.log(m);
            
          });
          console.log(this.userNamePhoto);

           // breadcrumb
          this.breadcrumbItems = [
            {
              label: 'PROJECTS',
              url: '/',
            },
            {
              label: this.members.name,
            },
            {
              label: 'MEMBERS',
            },
          ];
        },
        error: () => {
          this.error = true;
        },
      });
  }
}
