import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { userGuard } from './core/guards/user/user.guard';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'projects', canActivate:[authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/pages/project/project.component').then(
            (c) => c.ProjectComponent,
          ),
      },

      {
        path: 'add',
        loadComponent: () =>
          import('./features/pages/add-project/add-project.component').then(
            (c) => c.AddProjectComponent,
          ),
      },
      {
        path: 'edit/:projectId',
        loadComponent: () =>
          import('./features/pages/edit-project/edit-project.component').then(
            (c) => c.EditProjectComponent,
          ),
      },

      {
        path: ':projectId',
        loadComponent: () =>
          import('./layouts/main-layout/main-layout.component').then(
            (c) => c.MainLayoutComponent,
          ),

        children: [
          {
            path: '',
            redirectTo: 'epics',
            pathMatch: 'full',
          },

          {
            path: 'epics',
            loadComponent: () =>
              import('./features/pages/epics/epics.component').then(
                (c) => c.EpicsComponent,
              ),
          },

          {
            path: 'tasks',
            loadComponent: () =>
              import('./features/pages/tasks/tasks.component').then(
                (c) => c.TasksComponent,
              ),
          },

          {
            path: 'members',
            loadComponent: () =>
              import('./features/pages/members/members.component').then(
                (c) => c.MembersComponent,
              ),
          },

          // {
          //   path: 'edit',
          //   loadComponent: () =>
          //     import('./features/pages/').then(
          //       (m) => m.EditProjectComponent
          //     ),
          // },
        ],
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent, canActivate:[userGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/components/sign-in/sign-in.component').then(
            (c) => c.SignInComponent,
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./core/auth/components/sign-up/sign-up.component').then(
            (c) => c.SignUpComponent,
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./core/auth/components/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent,
          ),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./core/auth/components/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent,
          ),
      },
    ],
  },
];
