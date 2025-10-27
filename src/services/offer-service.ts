import { Injectable } from "@angular/core";
import { ItemType, Offer } from "../model";
import { HttpClient } from "@angular/common/http";
import { ItemService } from "./item-service";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class OfferService {
  private readonly offers: Offer[] = [];

  constructor(http: HttpClient, private itemService: ItemService) {
    this.offers.push({
      rowid: 1,
      itemid: 545,
      playername: 'Ralp',
      price: 10120,
      amount: 1,
      expirydate: '12 hours',
      sessionid: '',
      itemtype: ItemType.neck
    }, {
      rowid: 2,
      itemid: 540,
      playername: 'Durial',
      price: 50000,
      amount: 1,
      expirydate: '5 minutes',
      sessionid: '',
      notes: "be quick please",
      itemtype: ItemType.helmet
    }, {
      rowid: 3,
      itemid: 383,
      playername: 'Pigma Hare',
      price: 50,
      amount: 556,
      expirydate: 'Expired',
      sessionid: '',
      notes: "raising funds for my new clan Star Wolf"
    })
  }

  private includeItems(offerList: Offer[]): void {
    offerList.map(i => i.item = this.itemService.getItem(i.itemid));
  }

  listOffers(type?: ItemType): Observable<Offer[]> {
    const offerList = this.offers
      .filter(i => !type || i.itemtype == type)
      .sort((a, b) => b.rowid - a.rowid);
    this.includeItems(offerList);
    return of(offerList);
  }

  getOffer(id: number): Observable<Offer | undefined> {
    return of(this.offers.find(i => i.rowid == id));
  }
}