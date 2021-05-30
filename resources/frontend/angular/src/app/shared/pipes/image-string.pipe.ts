import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageString'
})
export class ImageStringPipe implements PipeTransform {

  transform(src: string | undefined): any {
    if(src === void 0 || typeof src === 'undefined' || src.length === 0 || src === null){
      return;
    }
    return src.split(';').sort((a,b) => b.length - a.length)[0];
  }

}
