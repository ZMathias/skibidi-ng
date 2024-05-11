import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-results-card-overview',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgOptimizedImage
  ],
  templateUrl: './results-card-overview.component.html',
  styleUrl: './results-card-overview.component.css'
})
export class ResultsCardOverviewComponent implements OnInit {
  @Input() resort: any; /*= {
    name: 'Ski resort Kaltenbad Zillertal Hohenweg',
    country: 'Country',
    difficulty_rating: 1.0,
    price: 0,
    rating: 5.0,
    image_url: '/assets/ski-resort-img.jpg',
    total_slope_length: 12.0,
    black_slope_length: 0.0,
    red_slope_length: 0.0,
    blue_slope_length: 0.0,
    neighbouring_towns: ["Edelsbrunner", "Grindelwald", "Zillertal"]
  };*/

  difficulty: string = '';

  ngOnInit() {
    console.log(this.resort);
    if (this.resort.resort.image_url === undefined) {
      this.resort.resort.image_url = '/assets/ski-resort-img.jpg';
    }
    if (this.resort.resort.difficulty_rating <= 0.5) {
      this.difficulty = 'Beginner difficulty';
    }
    else if (this.resort.resort.difficulty_rating <= 1.0) {
      this.difficulty = 'Intermediate difficulty';
    }
    else {
      this.difficulty = 'Advanced difficulty';
    }
  }

}
