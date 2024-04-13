import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-gold-area',
  templateUrl: './modal-gold-area.component.html',
  styleUrls: ['./modal-gold-area.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ModalGoldAreaComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

}
