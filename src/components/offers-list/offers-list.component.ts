import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon";
import { Offer } from '../../model';
import { NgClass } from '@angular/common';
import { RouterLink } from "@angular/router";
import { OfferService } from '../../services/offer-service';

@Component({
  selector: 'app-offers-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, NgClass, RouterLink],
  templateUrl: './offers-list.component.html'
})
export class OffersListComponent {
  readonly displayedColumns = ["itemname", "price", "playername", "notes", "age"];
  readonly dataSource = new MatTableDataSource<Offer>();

  constructor(offerService: OfferService) {
    offerService.listOffers().subscribe(list => this.dataSource.data = list);
  }
}
