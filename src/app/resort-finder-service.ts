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
    budgetTarget: number | null,
    blackPisteLength: number | null,
    redPisteLength: number | null,
    bluePisteLength: number | null
  } =
    {
      country: null,
      numberOfPeople: this.NUMBER_DEFAULT,
      startDate: this.DATE_DEFAULT,
      endDate: this.DATE_DEFAULT,
      ratingTarget: null,
      budgetTarget: null,
      blackPisteLength: null,
      redPisteLength: null,
      bluePisteLength: null
    };

  resortData: any;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  loadJsonFile() {
    this.http.get('/assets/data/resort-data.json')
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
        } else {
          /*this.toastr.error('Error loading the data file');*/
        }
      });
  }
}
