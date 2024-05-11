import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { ResortFinderService } from "../resort-finder-service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ResultsCardOverviewComponent} from "./results-card-overview/results-card-overview.component";
import {PlannerFormComponent} from "./planner-form/planner-form.component";

@Component({
  selector: 'app-result-viewer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ResultsCardOverviewComponent,
    NgForOf,
    PlannerFormComponent,
    NgIf
  ],
  templateUrl: './result-viewer.component.html',
  styleUrl: './result-viewer.component.css'
})
export class ResultViewerComponent {
  constructor(public resortFinderService: ResortFinderService) {}
  showResults: boolean = false;
}
