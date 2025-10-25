import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-offers-list',
  imports: [MatTableModule],
  templateUrl: './offers-list.component.html'
})
export class OffersListComponent {
  readonly displayedColumns = ["itemname", "price", "amount", "playername", "notes", "age"];
  readonly dataSource = new MatTableDataSource();

  constructor() {
    console.log(this.dataSource.data);
  }
}
