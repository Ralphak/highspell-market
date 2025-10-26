export interface Item {
  rowid: number;
  name: string;
  image?: string;
  imageUrl?: string;
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
  item: Item;
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

export interface ItemSearch {
  title: {
    InternalID: number,
    Name: string
  }
}