import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {ResortFinderService} from "../../resort-finder-service";
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

  resortServiceInstance: ResortFinderService;

  // Inject ResortFinderService
  constructor(
    private resortService: ResortFinderService,
    private router: Router
  ) {
    this.resortServiceInstance = resortService;
  }

  numberOfPeopleValidityClass: string = 'valid';
  numberOfPeopleValidity: boolean = false;
  dateValidityClass: string = 'valid';
  dateValidity: boolean = false;
  showResults: boolean = false;
  @Output() showResultsEvt = new EventEmitter<boolean>();

  requestLoadJsonFile() {
    this.resortServiceInstance.loadJsonFile();
  }

  async waitForCandidates() {
    while (!this.resortServiceInstance.hasData()) {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  onSubmitClick(countrySelector: HTMLSelectElement,
                numberOfPeople: HTMLInputElement,
                arrivalDate: HTMLInputElement,
                departureDate: HTMLInputElement,
                ratingTarget: HTMLInputElement,
                budgetTarget: HTMLInputElement,
                difficultyTarget: HTMLSelectElement ) {
    this.requestLoadJsonFile();
    this.checkNumberOfPeopleValidity(numberOfPeople);
    this.checkDateValidity(arrivalDate, departureDate);
    if(this.numberOfPeopleValidity && this.dateValidity)
    {
      this.onSubmitForm(countrySelector, numberOfPeople, arrivalDate, departureDate, ratingTarget, budgetTarget, difficultyTarget);
      this.waitForCandidates().then(r => {
        this.showResults = true;
        this.showResultsEvt.emit(this.showResults);
      });
    }
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
    this.resortServiceInstance.searchCriteria.country = countryElement.value !== 'def' ? countryElement.value : null;
    this.resortServiceInstance.searchCriteria.numberOfPeople = numberOfPeopleElement.valueAsNumber;
    this.resortServiceInstance.searchCriteria.startDate = new Date(startDateElement.value);
    this.resortServiceInstance.searchCriteria.endDate = new Date(endDateElement.value);
    this.resortServiceInstance.searchCriteria.ratingTarget = ratingElement.value !== null ? ratingElement.valueAsNumber : null;
    this.resortServiceInstance.searchCriteria.budgetTarget = budgetElement.value !== null ? budgetElement.valueAsNumber : null;
    this.resortServiceInstance.searchCriteria.hardnessPreference = hardnessElement.value !== 'def' ? hardnessElement.value : null;



    console.log('Submitted following criteria:')
    for (const key in this.resortServiceInstance.searchCriteria) {
      if (Reflect.get(this.resortServiceInstance.searchCriteria, key) !== this.resortServiceInstance.NUMBER_DEFAULT && Reflect.get(this.resortServiceInstance.searchCriteria, key) !== this.resortServiceInstance.DATE_DEFAULT && Reflect.get(this.resortServiceInstance.searchCriteria, key) !== this.resortServiceInstance.STRING_DEFAULT) {
        console.log(key + ': ' + Reflect.get(this.resortServiceInstance.searchCriteria, key))
      }
    }
  }
}
