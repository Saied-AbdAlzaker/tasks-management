import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ProjectMemberResponse } from '../../interfaces/members/project-members';

@Injectable({
  providedIn: 'root',
})
export class ProjectMembersService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getProjectMembers(projectId: string) {
    const headers = new HttpHeaders({
      apikey: environment.supabaseAnonKey,
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<ProjectMemberResponse[]>(
      `${environment.supabaseUrl}/rest/v1/get_project_members?project_id=eq.${projectId}`,
      { headers },
    );
  }
}
