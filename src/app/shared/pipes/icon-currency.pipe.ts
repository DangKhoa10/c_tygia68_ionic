import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconCurrency',
  standalone: true,
})
export class IconCurrencyPipe implements PipeTransform {
  transform(value: string, path: string = ''): string {
    if (path === 'URL') {
      return `https://api.rate68.com/images/${value}.png`;
    }
    return './assets/images/icon_currency/' + value + '.png';
  }
}
