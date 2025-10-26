import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon";
import { Offer } from '../../model';
import { WikiService } from '../../services/wiki-service';
import { NgClass } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-offers-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, NgClass, RouterLink],
  templateUrl: './offers-list.component.html'
})
export class OffersListComponent {
  readonly displayedColumns = ["itemname", "price", "playername", "notes", "age"];
  readonly dataSource = new MatTableDataSource<Offer>();

  constructor(
    private wikiService: WikiService
  ) {
    this.dataSource.data.push({
      rowid: 0,
      item: {
        rowid: 0,
        name: "Fisherman's Pendant",
        image: 'Fisherman%27s_pendant.png',
        tradeable: true,
        edible: true,
        equipable: false
      },
      playername: 'Ralp',
      price: 10120,
      amount: 1,
      expirydate: '12 hours',
      sessionid: ''
    }, {
      rowid: 1,
      item: {
        rowid: 1,
        name: "Green Bandit Mask",
        image: 'Green_bandit_mask.png',
        tradeable: true,
        edible: false,
        equipable: true
      },
      playername: 'Durial',
      price: 50000,
      amount: 1,
      expirydate: '5 minutes',
      sessionid: '',
      notes: "be quick please"
    }, {
      rowid: 2,
      item: {
        rowid: 2,
        name: "Pig Iron Bar",
        image: 'Pig_iron_bar.png',
        tradeable: true,
        edible: false,
        equipable: false
      },
      playername: 'Pigma Hare',
      price: 50,
      amount: 556,
      expirydate: 'Expired',
      sessionid: '',
      notes: "raising funds for my new clan Star Wolf"
    });
    this.dataSource.data.forEach(data => this.getImageUrl(data));
    console.log(this.dataSource.data);
  }

  private getImageUrl(offer: Offer): string {
    if (offer.item.image && !offer.item.imageUrl) {
      offer.item.imageUrl = this.wikiService.retrieveImageUrl(offer.item.image);
    }
    return offer.item.imageUrl ?? '';
  }
}
