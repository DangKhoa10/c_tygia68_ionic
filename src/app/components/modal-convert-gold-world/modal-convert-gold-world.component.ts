import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-convert-gold-world',
  templateUrl: './modal-convert-gold-world.component.html',
  styleUrls: ['./modal-convert-gold-world.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ModalConvertGoldWorldComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

}
