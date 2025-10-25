import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Offer, SessionStorage } from '../model';
import * as uuid from 'uuid';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('highspell-market');

  private get storage(): SessionStorage {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId || !uuid.validate(sessionId)) {
      const newStorage = new SessionStorage(uuid.v7(), []);
      Object.entries(newStorage).forEach(kv => localStorage.setItem(kv[0], JSON.stringify(kv[1])));
      return newStorage;
    }
    return {
      sessionId,
      myOffers: JSON.parse(localStorage.getItem("myOffers") ?? "[]")
    };
  }

  get myOffers(): number[] {
    return this.storage.myOffers;
  }

  addOfferToStorage(offer: Offer): void {
    if (offer.sessionid === this.storage.sessionId) {
      this.myOffers.push(offer.rowid);
      localStorage.setItem("myOffers", JSON.stringify(this.myOffers));
    }
  }
}
