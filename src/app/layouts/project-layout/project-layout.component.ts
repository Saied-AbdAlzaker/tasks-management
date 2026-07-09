import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectSidebarComponent } from "../../shared/components/project-sidebar/project-sidebar.component";

@Component({
  selector: 'app-project-layout',
  standalone: true,
  imports: [RouterOutlet, ProjectSidebarComponent],
  templateUrl: './project-layout.component.html',
  styleUrl: './project-layout.component.scss'
})
export class ProjectLayoutComponent {

}
