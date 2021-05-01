import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
      let date = new Date(value);
      return date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
  }

}
