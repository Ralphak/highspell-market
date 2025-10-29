import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Offer, SessionStorage } from 'model';
import * as uuid from 'uuid';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('highspell-market');

  private get storage(): SessionStorage {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId || !uuid.validate(sessionId)) {
      const newStorage = new SessionStorage(uuid.v7(), []);
      Object.entries(newStorage).forEach(kv => localStorage.setItem(kv[0], kv[1]));
      return newStorage;
    }
    return {
      sessionId,
      myOffers: (localStorage.getItem("myOffers") ?? "").split(',').filter(Boolean).map(Number)
    };
  }

  protected get sessionId(): string {
    return this.storage.sessionId;
  }

  get myOffers(): number[] {
    return this.storage.myOffers;
  }

  protected addOfferToStorage(offer: Offer): void {
    if (offer.sessionid === this.storage.sessionId) {
      this.myOffers.push(offer.rowid);
      localStorage.setItem("myOffers", JSON.stringify(this.myOffers));
    }
  }
}
