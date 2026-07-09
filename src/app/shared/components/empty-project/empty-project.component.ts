import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-project',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empty-project.component.html',
  styleUrl: './empty-project.component.scss'
})
export class EmptyProjectComponent {

}
