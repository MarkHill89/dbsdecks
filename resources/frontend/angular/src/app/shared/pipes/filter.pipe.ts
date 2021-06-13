import { Pipe, PipeTransform, Injectable } from "@angular/core";

/*
 * Filter elements by specified fields on ngFor
 * Usage:
 *   *ngFor="let row of data | filter: searchString
 */
@Pipe({
  name: "filter",
  pure: false
})
@Injectable()
export class FilterPipe implements PipeTransform {

  /**
  * @param data {array}
  * @param search {string}
  * @returns {array}
  */
  transform(data: any[], searchText: string): any {
    if (!data || typeof data !== "object") {
      return;
    }

    if (!searchText) return data; 

    return data.filter((item:any) => {
      for (const k in item) {
        if (item[k] && item[k].toString().match(new RegExp(searchText, "i"))) {
          return item;
        }
      }
    });
  }
}
