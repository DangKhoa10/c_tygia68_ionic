import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPrecision } from '../libs/currency';

@Pipe({
  name: 'localizedNumber',
  standalone: true,
})
export class LocalizedNumberPipe implements PipeTransform {
  transform(
    value: any,
    currencyCode: string = 'VND',
    digitsInfo: string | null = null
  ): any {
    value = value.toString().replaceAll(',', '');
    const currencyPipe: CurrencyPipe = new CurrencyPipe('vi');
    if (!digitsInfo) {
      digitsInfo = '1.0-' + (CurrencyPrecision[currencyCode] ?? 2);
    }
    return currencyPipe.transform(value, currencyCode, '', digitsInfo);
  }
}
