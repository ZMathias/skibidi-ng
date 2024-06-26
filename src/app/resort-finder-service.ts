import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, of} from "rxjs";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class ResortFinderService {

  // Default values for the search criteria
  DATE_DEFAULT: Date = new Date(0);
  NUMBER_DEFAULT: number = -1;
  STRING_DEFAULT: string = '';

  searchCriteria: {
    country: string | null,
    numberOfPeople: number,
    startDate: Date,
    endDate: Date,
    ratingTarget: number | null,
    ratingWeight: number | null,
    budgetTarget: number | null,
    budgetWeight: number | null,
    hardnessPreference: string | null,
  } =
    {
      country: null,
      numberOfPeople: this.NUMBER_DEFAULT,
      startDate: this.DATE_DEFAULT,
      endDate: this.DATE_DEFAULT,
      ratingTarget: null,
      ratingWeight: 2,
      budgetTarget: null,
      budgetWeight: 3,
      hardnessPreference: 'medium'
    };

  resortData: any;
  candidates: any;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  hasData(): boolean {
    return this.candidates !== undefined && this.candidates.length > 0;
  }

  loadJsonFile() {
    this.http.get('/assets/data/resort.json')
      .pipe(
        catchError(error => {
          /*this.toastr.error('Error loading the data file');*/
          return of(null); // return an empty observable to prevent the error from propagating
        })
      )
      .subscribe((res) => {
        if (res) {
          this.resortData = res;
          /*this.toastr.success('Data loaded successfully');*/
          console.log('--- result :: ', this.resortData);
          this.searchResorts();
        } else {
          /*this.toastr.error('Error loading the data file');*/
        }
      });
  }

  searchResorts() {
    // we asssign different weights to the criteria
    // and we calculate the score for each resort
    // we then sort the resorts by score and return the top 5
    // the number of people aren't a criteria for the score
    this.candidates = [];

    (<Array<Object>>this.resortData).forEach((resort: any) => {
      let score: number = 0;

      if (resort.country !== undefined && this.searchCriteria.country !== null && resort.country !== this.searchCriteria.country) {
        return;
      }

      if (resort.season_start !== undefined && resort.season_end !== undefined) {
        const season_start = new Date(resort.season_start);
        const season_end = new Date(resort.season_end);
        if (this.searchCriteria.startDate < season_start) {
          return;
        } else {
          score += 10;
        }
      }

      if (this.searchCriteria.ratingTarget !== null && this.searchCriteria.ratingWeight !== null && resort.rating !== undefined) {
        const ratingScore = (1 - Math.abs(resort.rating - this.searchCriteria.ratingTarget) / 5.0) * 10;
        score += ratingScore > 0 ? ratingScore : 0;
      }

      if (this.searchCriteria.budgetTarget !== null && this.searchCriteria.budgetWeight !== null && resort.adult !== undefined) {
        // find the absolute difference and give the best score to the closest ones
        const budget = resort.adult * this.searchCriteria.numberOfPeople;
        const budgetScore = (1 - Math.abs(this.searchCriteria.budgetTarget - budget) / budget) * 10;
        score += budgetScore > 0 ? budgetScore : 0;
      }

      const hardness = resort.difficultyRating;
      const hardnessPreference = this.searchCriteria.hardnessPreference;
      if (hardnessPreference !== null && hardness !== undefined) {
        let hardnessScore = 0;
        if (hardnessPreference === 'easy') {
          hardnessScore = (1 - Math.abs(0.5 - hardness) / 3.0) * 10;
        }
        else if (hardnessPreference === 'medium') {
          hardnessScore = (1 - Math.abs(0.75 - hardness) / 3.0) * 10;
        }
        else if (hardness >= 1.0) {
          hardnessScore += 10;
        }
        score += hardnessScore > 0 ? hardnessScore : 0;
      }

      this.candidates.push({resort: resort, score: score});
    });

    this.candidates.sort((a: { score: number; }, b: { score: number; }) => b.score - a.score);
    // we only keep the top 5
    this.candidates = this.candidates.slice(0, 5);
  }
}
