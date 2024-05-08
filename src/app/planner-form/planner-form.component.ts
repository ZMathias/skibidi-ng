import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {ResortFinderService} from "../resort-finder-service";
import {RouterLink, Router} from "@angular/router";

@Component({
  selector: 'app-planner-form',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './planner-form.component.html',
  styleUrl: './planner-form.component.css'
})
export class PlannerFormComponent {

  // Inject ResortFinderService
  constructor(
    private resortService: ResortFinderService,
    private router: Router
  ) {
  }

  numberOfPeopleValidityClass: string = 'valid';
  numberOfPeopleValidity: boolean = false;
  dateValidityClass: string = 'valid';
  dateValidity: boolean = false;

  requestLoadJsonFile() {
    this.resortService.loadJsonFile();
  }

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
               hardnessElement: HTMLSelectElement
  )
  {
    this.resortService.searchCriteria.country = countryElement.value !== 'def' ? countryElement.value : null;
    this.resortService.searchCriteria.numberOfPeople = numberOfPeopleElement.valueAsNumber;
    this.resortService.searchCriteria.startDate = new Date(startDateElement.value);
    this.resortService.searchCriteria.endDate = new Date(endDateElement.value);
    this.resortService.searchCriteria.ratingTarget = ratingElement.value !== null ? ratingElement.valueAsNumber : null;
    this.resortService.searchCriteria.budgetTarget = budgetElement.value !== null ? budgetElement.valueAsNumber : null;
    this.resortService.searchCriteria.hardnessPreference = hardnessElement.value !== 'def' ? hardnessElement.value : null;



    console.log('Submitted following criteria:')
    for (const key in this.resortService.searchCriteria) {
      if (Reflect.get(this.resortService.searchCriteria, key) !== this.resortService.NUMBER_DEFAULT && Reflect.get(this.resortService.searchCriteria, key) !== this.resortService.DATE_DEFAULT && Reflect.get(this.resortService.searchCriteria, key) !== this.resortService.STRING_DEFAULT) {
        console.log(key + ': ' + Reflect.get(this.resortService.searchCriteria, key))
      }
    }

    this.router.navigate(['/results']).then(r => console.log('Navigated to results'));
  }
}
