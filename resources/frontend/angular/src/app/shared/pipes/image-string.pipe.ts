import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageString'
})
export class ImageStringPipe implements PipeTransform {

  transform(src: any): any {
    if(src === void 0 || typeof src === 'undefined' || src.length === 0 || src === null){
      return;
    }
    let imageArray = src.split(";");
    return imageArray.sort((a: any, b: any) => b.length - a.length)[0];
  }

}
