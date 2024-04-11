import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flagCurrency',
  standalone: true,
})
export class FlagCurrencyPipe implements PipeTransform {
  transform(value: string): string {
    return './assets/images/currency/' + value + '.svg';
  }
}
