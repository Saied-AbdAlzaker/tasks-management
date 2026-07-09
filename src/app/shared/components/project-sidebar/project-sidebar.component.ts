import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-project-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './project-sidebar.component.html',
  styleUrl: './project-sidebar.component.scss',
})
export class ProjectSidebarComponent {
  private route = inject(ActivatedRoute);

  projectId!: string;

  menuItems = [
    {
      label: 'Tasks',
      icon: 'tasks.svg',
      path: 'tasks',
    },
    {
      label: 'Members',
      icon: 'members.svg',
      path: 'members',
    },
    {
      label: 'Epics',
      icon: 'epics.svg',
      path: 'epics',
    },
    {
      label: 'Project Details',
      icon: 'details.svg',
      path: 'edit',
    },
  ];

  ngOnInit() {
    this.projectId = this.route.parent!.snapshot.params['projectId'];

    //     this.route.parent?.params.subscribe(params => {
    //   this.projectId = params['projectId'];
    // });
  }
}
