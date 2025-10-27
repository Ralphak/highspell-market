import { Component } from "@angular/core";
import { FormsModule, NgModel } from "@angular/forms";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { exhaustMap, filter, Subject } from "rxjs";
import { Item } from "../../model";
import { ItemService } from "../../services/item-service";
import { ItemCardComponent } from "../item-card/item-card.component";

@Component({
  selector: 'app-create-offer',
  imports: [MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ItemCardComponent],
  templateUrl: './create-offer.component.html'
})
export class CreateOfferComponent {
  private searchItemField$ = new Subject<string>();
  private searchResults: Item[] = [];
  filteredSearchResults: Item[] = [];
  selectedItem?: Item;
  loadingSearchMessage?: string;

  constructor(itemService: ItemService) {
    this.searchItemField$.pipe(
      filter(value => value?.length >= 3),
      exhaustMap(value => itemService.searchItemName(value))
    ).subscribe(res => {
      this.searchResults = this.filteredSearchResults = res;
      this.loadingSearchMessage = "No items found";
    });
  }

  callSearchItem(event: string) {
    if(typeof event != "string")
      return;
    this.loadingSearchMessage = "Loading...";
    this.filteredSearchResults = this.searchResults.filter(result => result.name.toLowerCase().includes(event.toLowerCase()));
    this.searchItemField$.next(event);
  }

  fetchItem(event: MatAutocompleteSelectedEvent) {
    const item = event.option.value as Item;
    this.searchItemField$.next("");
    this.selectedItem = item;
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