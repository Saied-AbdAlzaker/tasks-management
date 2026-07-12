import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProjectMemberResponse } from '../../interfaces/members/project-members';

@Injectable({
  providedIn: 'root',
})
export class ProjectMembersService {
  private http = inject(HttpClient);

  getProjectMembers(projectId: string) {
    return this.http.get<ProjectMemberResponse[]>(
      `${environment.supabaseUrl}/rest/v1/get_project_members?project_id=eq.${projectId}`,
    );
  }
}
