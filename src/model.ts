export enum ItemType { "food", "drink", "weapon", "chest", "legs", "helmet", "gloves", "shield", "neck", "back", "projectile", "boots" }

export interface Item {
  id: number;
  name: string;
  inspect: string;
  generalbuy: number;
  generalsell: number;
  aurumminor: number;
  aurummajor: number;
  type?: ItemType;
  //for internal use
  imageUrl?: string;
  imageLoading?: boolean;
}

export interface Offer extends NewOffer{
  rowid: number;
  //for internal use
  item?: Item;
}

export interface NewOffer {
  itemid: number;
  itemtype?: ItemType;
  playername: string;
  price: number;
  amount: number;
  notes?: string;
  expirydate: string;
  sessionid: string;
}

export class SessionStorage {
  sessionId: string;
  myOffers: number[];

  constructor(sessionId: string, myOffers: number[]) {
    this.sessionId = sessionId;
    this.myOffers = myOffers;
  }
}