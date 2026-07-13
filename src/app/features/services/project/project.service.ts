import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateProject } from '../../interfaces/project/project';
import { environment } from '../../../../environments/environment.development';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);

  createProject(project: CreateProject) {
    return this.http.post(
      `${environment.supabaseUrl}/rest/v1/projects`,
      project,
    );
  }

  getProjects(): Observable<any> {
    return this.http.get<any[]>(
      `${environment.supabaseUrl}/rest/v1/rpc/get_projects`,
    );
  }

  getProjectById(id: string) {
    return this.http.get<any[]>(
      `${environment.supabaseUrl}/rest/v1/projects?id=eq.${id}&select=*`,
    );
  }

  updateProject(id: string, body: CreateProject) {
    return this.http.patch(
      `${environment.supabaseUrl}/rest/v1/projects?id=eq.${id}`,
      body,
    );
  }
}
