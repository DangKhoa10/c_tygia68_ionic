import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-convert-fiat',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './modal-convert-fiat.component.html',
  styleUrls: ['./modal-convert-fiat.component.scss'],
})
export class ModalConvertFiatComponent   {

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {

  }

  

}
