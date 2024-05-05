import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {routes} from "./app.routes";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'skibidi-ng';
  ngOnInit() {
    RouterModule.forRoot(routes);
  }
}
