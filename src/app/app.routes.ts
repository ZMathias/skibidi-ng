import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PlannerFormComponent } from "./planner-form/planner-form.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'planner',
    component: PlannerFormComponent
  }
];
