import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconCurrency',
  standalone: true,
})
export class IconCurrencyPipe implements PipeTransform {
  transform(value: string): string {
    return './assets/images/icon_currency/' + value + '.png';
  }
}
