import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
@Component({
  selector: 'app-modal-charged',
  templateUrl: './modal-charged.component.html',
  styleUrls: ['./modal-charged.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ModalChargedComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {
    addIcons({ chevronBack });
  }
  ngOnInit() {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {}
  customPopoverOptions = {
    // header: 'Hair Color',
    // subHeader: 'Select your hair color',
    // message: 'Only select your dominant hair color',
  };
}
