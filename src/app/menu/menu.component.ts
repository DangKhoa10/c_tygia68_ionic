import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calculator, cash, diamond, people, close } from 'ionicons/icons';
import { ModalConvertFiatComponent } from '../components/modal-convert-fiat/modal-convert-fiat.component';
import { ModalConvertGoldComponent } from '../components/modal-convert-gold/modal-convert-gold.component';
import { ModalConvertGoldWorldComponent } from '../components/modal-convert-gold-world/modal-convert-gold-world.component';
import { ModalChargedComponent } from '../components/modal-charged/modal-charged.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  themeToggle = false;

  menus = [
    // {
    //   id: 0,
    //   name: 'Cộng đồng tỷ giá 68',
    //   icon: 'people',
    //   action: 'SOCIAL',
    //   path: 'community',
    // },
    {
      id: 1,
      name: 'Tính lãi vay',
      icon: 'calculator',
      action: 'CALCULATOR',
    },
    {
      id: 2,
      name: 'Chuyển đổi tiền tệ',
      icon: 'cash',
      action: 'CONVERT_FIAT',
    },
    {
      id: 3,
      name: 'Quy đổi giá vàng thế giới',
      icon: 'diamond',
      action: 'GOLD_WORLD',
    },
    {
      id: 4,
      name: 'Quy đổi giá vàng tự do',
      icon: 'diamond',
      action: 'GOLD',
    },
 
  ];

  toggleChange(value: any | boolean) {
    if ((typeof value === 'boolean' && value) || value.detail?.checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
    }
  }
  constructor(private modalCtrl: ModalController) {
    addIcons({ people, cash, diamond, calculator, close });
  }

  async openModal(action: string) {
    switch (action) {
      case 'SOCIAL':
        break;
      case 'CALCULATOR':
        const modalCHARGED = await this.modalCtrl.create({
          component: ModalChargedComponent,
  
        });
        modalCHARGED.present();
        break;
      case 'CONVERT_FIAT':
        const modal = await this.modalCtrl.create({
          component: ModalConvertFiatComponent,
        });
        modal.present();
        break;
      case 'GOLD':
        const modalGold = await this.modalCtrl.create({
          component: ModalConvertGoldComponent,
        });
        modalGold.present();
        break;
      case 'GOLD_WORLD':
        const modalGoldW = await this.modalCtrl.create({
          component: ModalConvertGoldWorldComponent,
        });
        modalGoldW.present();
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.loadTheme();
  }

  loadTheme() {
    let theme = localStorage.getItem('theme');
    if (theme == 'dark') {
      this.themeToggle = true;
    } else {
      this.themeToggle = false;
    }
    this.toggleChange(theme == 'dark');
  }
}
