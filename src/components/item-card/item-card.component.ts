import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { Item } from "model";
import { TitleCasePipe } from "@angular/common";
import { MatTooltipModule } from "@angular/material/tooltip";
import { WikiService } from "services/wiki-service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-item-card',
  imports: [MatCardModule, TitleCasePipe, MatTooltipModule, MatProgressSpinnerModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent implements OnChanges {
  @Input() item!: Item;
  avgWeek?: number;
  avgMonth?: number;

  constructor(private wikiService: WikiService, private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["item"]) {
      this.item.imageUrl = this.wikiService.retrieveImageUrl(this.item.name);
      this.item.imageLoading = true;
    }
    this.cdr.detectChanges();
  }

  stopLoading(item: Item) {
    item.imageLoading = false;
  }
}