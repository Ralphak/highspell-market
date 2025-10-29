import { Injectable } from "@angular/core";
import { Item } from "model";
import { HttpClient } from "@angular/common/http";
import { WikiService } from "services/wiki-service";
import itemDB from "database/items.json";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly items: Item[] = [];

  constructor(http: HttpClient, private wikiService: WikiService) {
    this.items.push(...itemDB as Item[]);
  }

  searchItemName(keyword: string): Observable<Item[]> {
    return of(
      this.items.filter(i => i.name.toLowerCase().includes(keyword.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  }

  getItem(id: number): Item | undefined {
    const item = this.items.find(i => i.id == id);
    if (item) {
      item.imageUrl = this.wikiService.retrieveImageUrl(item.name);
      item.imageLoading = true;
    }
    return item;
  }
}