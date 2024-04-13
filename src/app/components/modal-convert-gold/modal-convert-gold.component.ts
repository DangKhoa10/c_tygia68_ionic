import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';

@Component({
  selector: 'app-modal-convert-gold',
  templateUrl: './modal-convert-gold.component.html',
  styleUrls: ['./modal-convert-gold.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ModalConvertGoldComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {
    addIcons({ chevronBack });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}
}
