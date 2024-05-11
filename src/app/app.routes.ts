import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PlannerFormComponent } from "./result-viewer/planner-form/planner-form.component";
import {ResultViewerComponent} from "./result-viewer/result-viewer.component";
import {AboutComponent} from "./about/about.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'planner',
    component: ResultViewerComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];
