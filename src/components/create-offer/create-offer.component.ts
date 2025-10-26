import { Component } from "@angular/core";
import { FormsModule, NgModel } from "@angular/forms";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { debounceTime, exhaustMap, filter, Subject } from "rxjs";
import { ItemSearch } from "../../model";
import { WikiService } from "../../services/wiki-service";

@Component({
  selector: 'app-create-offer',
  imports: [MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './create-offer.component.html'
})
export class CreateOfferComponent {
  private searchItemField$ = new Subject<string>();
  private searchResults: ItemSearch[] = [];
  filteredSearchResults: ItemSearch[] = [];
  errorlog: string = "";

  constructor(
    wikiService: WikiService
  ) {
    this.searchItemField$.pipe(
      debounceTime(500),
      filter(value => value?.length >= 3 && !this.filteredSearchResults.length),
      exhaustMap(value => wikiService.searchItems(value))
    ).subscribe(res => this.searchResults = res, (err) => this.errorlog = JSON.stringify(err));
  }

  callSearchItem(event: string) {
    if(typeof event != "string")
      return;
    this.filteredSearchResults = this.searchResults.filter(result => result.title.Name.toLowerCase().includes(event.toLowerCase()));
    this.searchItemField$.next(event);
  }

  fetchItem(event: MatAutocompleteSelectedEvent) {
    const item = event.option.value as ItemSearch;
    this.searchItemField$.next("");
    console.log(item);
  }

  showOptionName(option: ItemSearch) {
    return option ? option.title.Name : "";
  }

  resetField(field: NgModel) {
    field.reset();
    this.searchResults = [];
    this.filteredSearchResults = [];
  }
}