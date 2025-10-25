export interface Item {
  rowid: number;
  name: string;
  image?: string;
  inspect?: string;
  tradeable: boolean;
  generalbuy?: number;
  generalsell?: number;
  aurumminor?: number;
  aurummajor?: number;
  edible: boolean;
  equipable: boolean;
}

export interface Offer {
  rowid: number;
  itemid: number;
  playername: string;
  price: number;
  amount?: number;
  notes?: string;
  expirydate: string
  sessionid: string
}

export class SessionStorage {
  sessionId: string;
  myOffers: number[];

  constructor(sessionId: string, myOffers: number[]) {
    this.sessionId = sessionId;
    this.myOffers = myOffers;
  }
}