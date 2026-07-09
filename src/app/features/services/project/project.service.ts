import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  private platformId: Object = inject(PLATFORM_ID);

  private getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      apikey: environment.supabaseAnonKey,
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });
  }

  createProject(project: CreateProject) {
    const headers = this.getHeaders();

    return this.http.post(
      `${environment.supabaseUrl}/rest/v1/projects`,
      project,
      { headers },
    );
  }

  getProjects(): Observable<HttpResponse<any[]>> {
    const headers = this.getHeaders();

    return this.http.get<any[]>(
      `${environment.supabaseUrl}/rest/v1/rpc/get_projects`,
      {
        headers,
        observe: 'response',
      },
    );
  }

  getProjectById(id: string) {
    const headers = this.getHeaders();

    return this.http.get<any[]>(
      `${environment.supabaseUrl}/rest/v1/projects?id=eq.${id}&select=*`,
      { headers },
    );
  }

  updateProject(id: string, body: CreateProject) {
    const headers = this.getHeaders();

    return this.http.patch(
      `${environment.supabaseUrl}/rest/v1/projects?id=eq.${id}`,
      body,
      { headers },
    );
  }
}
