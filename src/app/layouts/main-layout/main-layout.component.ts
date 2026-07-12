import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
} from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  standalone: true,
})
export class MainLayoutComponent implements OnInit {
  sidebarOpen = false;
  collapsed = false;
  userName: string = '';
  userJob: string = '';
  userNamePhoto: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  projectId!: string;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.projectId = params.get('projectId')!;

      console.log('MainLayout:', this.projectId);
      console.log('URL:', this.router.url);
    });

    this.getUser();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  menuItems = [
    {
      label: 'Projects',
      title: 'Projects',
      img: '../../../assets/images/folder.svg',
      route: '/projects',
      path: 'projects',
    },
    {
      label: 'Project Epics',
      title: 'Epics',
      img: '../../../assets/images/epic.svg',
      route: '/epics',
      path: 'epics',
    },
    {
      label: 'Project Tasks',
      title: 'Tasks',
      img: '../../../assets/images/task.svg',
      route: '/tasks',
      path: 'tasks',
    },
    {
      label: 'Project Members',
      title: 'Members',
      img: '../../../assets/images/users.svg',
      route: '/members',
      path: 'members',
    },
    {
      label: 'Project Details',
      title: 'Details',
      img: '../../../assets/images/details.svg',
      route: '/details',
      path: 'details',
    },
  ];

  getUser() {
    this.authService.getUserInfo().subscribe({
      next: (res) => {
        this.userName = res.user_metadata.name;
        this.userJob = res.user_metadata.job_title;
        this.userNamePhoto = res.user_metadata.name.slice(0, 2).toUpperCase();
      },
    });
  }

  // Logout
  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        
        // localStorage.clear();
        this.router.navigate(['/login']);
      },
    });
  }
}
