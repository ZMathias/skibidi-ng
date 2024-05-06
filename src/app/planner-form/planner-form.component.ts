import { Component } from '@angular/core';
import {NgClass} from "@angular/common";

// Default values for the search criteria
const DATE_DEFAULT: Date = new Date(0);
const NUMBER_DEFAULT: number = -1;
const STRING_DEFAULT: string = '';


@Component({
  selector: 'app-planner-form',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './planner-form.component.html',
  styleUrl: './planner-form.component.css'
})
export class PlannerFormComponent {
  private searchCriteria: {
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
      numberOfPeople: NUMBER_DEFAULT,
      startDate: DATE_DEFAULT,
      endDate: DATE_DEFAULT,
      ratingTarget: null,
      budgetTarget: null,
      blackPisteLength: null,
      redPisteLength: null,
      bluePisteLength: null
    };

  numberOfPeopleValidityClass: string = 'valid';
  numberOfPeopleValidity: boolean = false;
  dateValidityClass: string = 'valid';
  dateValidity: boolean = false;

  checkNumberOfPeopleValidity(numberOfPeople: HTMLInputElement): void {
    if (isNaN(numberOfPeople.valueAsNumber)) {
      this.numberOfPeopleValidityClass = 'invalid';
      this.numberOfPeopleValidity = false;
    } else {
      this.numberOfPeopleValidityClass = 'valid';
      this.numberOfPeopleValidity = true;
    }
  }

  checkDateValidity(startDate: HTMLInputElement, endDate: HTMLInputElement): void {
    if ((new Date(startDate.value)) > (new Date(endDate.value)) || startDate.value === "" || endDate.value === "") {
      this.dateValidityClass = 'invalid';
      this.dateValidity = false;
    } else {
      this.dateValidityClass = 'valid';
      this.dateValidity = true;
    }
  }

  /*checkRequired(numberOfPeople: HTMLInputElement, startDate: HTMLInputElement, endDate: HTMLInputElement): boolean {
    let validity: boolean = true;
    this.numberOfPeopleValidityClass = 'valid';
    this.dateValidityClass = 'valid';

    if (isNaN(numberOfPeople.valueAsNumber)) {
      validity = false;
      this.numberOfPeopleValidityClass = 'invalid';
    }

    if ((new Date(startDate.value)) > (new Date(endDate.value)) || startDate.value === "" || endDate.value === "") {
      validity = false;
      this.dateValidityClass = 'invalid';
    }

    return validity;
  }*/

  onSubmitForm(countryElement: HTMLSelectElement,
               numberOfPeopleElement: HTMLInputElement,
               startDateElement: HTMLInputElement,
               endDateElement: HTMLInputElement,
               ratingElement: HTMLInputElement,
               budgetElement: HTMLInputElement,
               blackPisteElement: HTMLInputElement,
               redPisteElement: HTMLInputElement,
               bluePisteElement: HTMLInputElement)
  {
    this.searchCriteria.country = countryElement.value !== 'def' ? countryElement.value : null;
    this.searchCriteria.numberOfPeople = numberOfPeopleElement.valueAsNumber;
    this.searchCriteria.startDate = new Date(startDateElement.value);
    this.searchCriteria.endDate = new Date(endDateElement.value);
    this.searchCriteria.ratingTarget = ratingElement.value !== null ? ratingElement.valueAsNumber : null;
    this.searchCriteria.budgetTarget = budgetElement.value !== null ? budgetElement.valueAsNumber : null;
    this.searchCriteria.blackPisteLength = blackPisteElement.valueAsNumber !== null ? blackPisteElement.valueAsNumber : null;
    this.searchCriteria.redPisteLength = redPisteElement.valueAsNumber !== null ? redPisteElement.valueAsNumber : null
    this.searchCriteria.bluePisteLength = bluePisteElement.valueAsNumber !== null ? bluePisteElement.valueAsNumber : null;
    ratingElement.className


    console.log('Submitted following criteria:')
    for (const key in this.searchCriteria) {
      if (Reflect.get(this.searchCriteria, key) !== NUMBER_DEFAULT && Reflect.get(this.searchCriteria, key) !== DATE_DEFAULT && Reflect.get(this.searchCriteria, key) !== STRING_DEFAULT) {
        console.log(key + ': ' + Reflect.get(this.searchCriteria, key))
      }
    }
  }

}
