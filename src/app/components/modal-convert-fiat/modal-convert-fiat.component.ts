import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
@Component({
  selector: 'app-modal-convert-fiat',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './modal-convert-fiat.component.html',
  styleUrls: ['./modal-convert-fiat.component.scss'],
})
export class ModalConvertFiatComponent {
  constructor(private modalCtrl: ModalController) {
    addIcons({ chevronBack });
  }
  moneyFrom = [
    {
      value: 'usd',
      label: 'USD',
    },
    {
      value: 'jpy',
      label: 'JYY',
    },
    {
      value: 'cny',
      label: 'CNY',
    },
    {
      value: 'thb',
      label: 'THB',
    },
  ];
  moneyTo = [
    {
      value: 'usd',
      label: 'USD',
    },
    {
      value: 'jpy',
      label: 'JYY',
    },
    {
      value: 'cny',
      label: 'CNY',
    },
    {
      value: 'thb',
      label: 'THB',
    },
  ];
  customPopoverOptions = {
    // header: 'Hair Color',
    // subHeader: 'Select your hair color',
    // message: 'Only select your dominant hair color',
  };
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {}
}
