import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ItemSearch } from "../model";

@Injectable({ providedIn: 'root' })
export class WikiService {
  private readonly wikiUrl = "https://highspell.wiki/w/";
  private readonly apiRoute = "api.php";

  constructor(private http: HttpClient){}

  retrieveImageUrl(imageName: string): string {
    return this.wikiUrl.concat("Special:Filepath/").concat(imageName);
  }

  searchItems(keyword: string): Observable<ItemSearch[]> {
    return this.http.get(this.wikiUrl.concat(this.apiRoute), {
      params: {
        action: "cargoquery",
        tables: "Items",
        fields: "InternalID,Name",
        where: `Name+LIKE+'%25${keyword}%25`,
        format: "json",
        limit: 5
      }
    }).pipe(
      map((res: any) => res.cargoquery as ItemSearch[])
    );
  }
}