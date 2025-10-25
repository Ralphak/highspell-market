import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class WikiService {
  private readonly wikiUrl = "https://highspell.wiki/w/";
  private readonly apiRoute = "api.php";

  constructor(private http: HttpClient){}

  retrieveImageUrl(imageName: string) {
    return this.wikiUrl.concat("Special:Filepath/").concat(imageName);
  }
}