import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { noop } from 'rxjs';

@Component({
  selector: 'app-input-custom',
  standalone: true,
  templateUrl: './input-custom.component.html',
  styleUrl: './input-custom.component.scss',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'w-100',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCustomComponent),
      multi: true,
    },
  ],
  
  imports: [FormsModule, CommonModule, MaskitoDirective, IonicModule],
})
export class InputCustomComponent implements ControlValueAccessor {
  protected value: any;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() slotEndText: string;

  constructor() {}
  maskOpts: MaskitoOptions = maskitoNumberOptionsGenerator({
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 8,
  });

  changeValue(value: any): void {
    this.onChangeCallback(value);
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
}
