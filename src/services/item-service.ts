import { Injectable } from "@angular/core";
import { Item } from "../model";
import { HttpClient } from "@angular/common/http";
import { WikiService } from "./wiki-service";
import itemDB from "../database/items.json";
import { delay, Observable, of } from "rxjs";

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
    ).pipe(delay(1000));
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