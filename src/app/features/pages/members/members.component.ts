import { Component, inject } from '@angular/core';
import { ProjectMembersService } from '../../services/projectMembers/project-members.service';
import { finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [],
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
          });
          console.log(this.userNamePhoto);
          
        },
        error: () => {
          this.error = true;
        },
      });
  }
}
