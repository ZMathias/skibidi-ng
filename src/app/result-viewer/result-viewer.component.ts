import { Component } from '@angular/core';
import { ResortFinderService } from "../resort-finder-service";

@Component({
  selector: 'app-result-viewer',
  standalone: true,
  imports: [],
  templateUrl: './result-viewer.component.html',
  styleUrl: './result-viewer.component.css'
})
export class ResultViewerComponent {
  constructor(private resortFinderService: ResortFinderService) {

  }

  onClick() {
    this.resortFinderService.loadJsonFile();
  }
}
