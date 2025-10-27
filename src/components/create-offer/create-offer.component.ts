import { Component } from "@angular/core";
import { FormsModule, NgModel } from "@angular/forms";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { filter, Subject } from "rxjs";
import { Item } from "../../model";
import { ItemService } from "../../services/item-service";

@Component({
  selector: 'app-create-offer',
  imports: [MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './create-offer.component.html'
})
export class CreateOfferComponent {
  private searchItemField$ = new Subject<string>();
  private searchResults: Item[] = [];
  filteredSearchResults: Item[] = [];
  errorlog: string = "";

  constructor(itemService: ItemService) {
    this.searchItemField$.pipe(
      filter(value => value?.length >= 3),
    ).subscribe(value => this.searchResults = itemService.searchItemName(value));
  }

  callSearchItem(event: string) {
    if(typeof event != "string")
      return;
    this.filteredSearchResults = this.searchResults.filter(result => result.name.toLowerCase().includes(event.toLowerCase()));
    this.searchItemField$.next(event);
  }

  fetchItem(event: MatAutocompleteSelectedEvent) {
    const item = event.option.value as Item;
    this.searchItemField$.next("");
    this.errorlog = JSON.stringify(item);
  }

  showOptionName(option: Item) {
    return option ? option.name : "";
  }

  resetField(field: NgModel) {
    field.reset();
    this.searchResults = [];
    this.filteredSearchResults = [];
  }
}