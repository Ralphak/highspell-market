import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class WikiService {
  private readonly wikiUrl = "https://highspell.wiki/w/";

  retrieveImageUrl(imageName: string, extension: string = "png"): string {
    return this.wikiUrl.concat(`Special:Filepath/${imageName}.${extension}`);
  }
}