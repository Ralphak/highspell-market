import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon";
import { Offer } from 'model';
import { NgClass, TitleCasePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { OfferService } from 'services/offer-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-offers-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, NgClass, RouterLink, MatProgressSpinnerModule, TitleCasePipe],
  templateUrl: './offers-list.component.html'
})
export class OffersListComponent {
  readonly displayedColumns = ["itemname", "price", "playername", "notes", "age"];
  readonly dataSource = new MatTableDataSource<Offer>();
  loading: boolean = true;

  constructor(private offerService: OfferService) {
    offerService.listOffers().subscribe(list => this.dataSource.data = list);
    setTimeout(() => this.loading = false, 3000);
  }

  stopLoading(offer: Offer) {
    offer.item!.imageLoading = false;
  }

  test() {
    this.offerService.test().subscribe(res => console.log(res));
  }
}
