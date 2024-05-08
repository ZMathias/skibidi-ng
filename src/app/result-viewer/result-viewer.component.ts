import { Component } from '@angular/core';
import { ResortFinderService } from "../resort-finder-service";
import {NgOptimizedImage} from "@angular/common";
import {ResultsCardOverviewComponent} from "./results-card-overview/results-card-overview.component";

@Component({
  selector: 'app-result-viewer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ResultsCardOverviewComponent
  ],
  templateUrl: './result-viewer.component.html',
  styleUrl: './result-viewer.component.css'
})
export class ResultViewerComponent {
  constructor(public resortFinderService: ResortFinderService) {

  }

  onClick() {
    //this.resortFinderService.loadJsonFile();
    this.resortFinderService.searchResorts();
  }
}
