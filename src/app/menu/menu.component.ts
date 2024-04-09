import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calculator, cash, diamond, people } from 'ionicons/icons';
import { ModalConvertFiatComponent } from '../components/modal-convert-fiat/modal-convert-fiat.component';

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
    {
      id: 0,
      name: 'Cộng đồng tỷ giá 68',
      icon: 'people',
      action: 'SOCIAL',
    },
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
      name: 'Quy đổi giá vàng tự do',
      icon: 'diamond',
      action: 'GOLD',
    },
    {
      id: 4,
      name: 'Quy đổi giá vàng thế giới',
      icon: 'diamond',
      action: 'GOLD_WORLD',
    },
    {
      id: 5,
      name: 'Giá vàng khu vực',
      icon: 'diamond',
      action: 'GOLD_REGION',
    },
  ];

  toggleChange(value: any | boolean) {
    if ((typeof value === 'boolean' && value) || value.detail.checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
    }
  }
  constructor(private modalCtrl: ModalController) {
    addIcons({ people, cash, diamond, calculator });
  }

  async openModal(action: string) {
    switch (action) {
      case 'CALCULATOR':
        break;
      case 'SOCIAL':
        break;
      case 'GOLD':
        break;
      case 'GOLD_WORLD':
        break;
      case 'GOLD_REGION':
        break;
      case 'CONVERT_FIAT':
        const modal = await this.modalCtrl.create({
          component: ModalConvertFiatComponent,
        });
        modal.present();
        const { data, role } = await modal.onWillDismiss();
        
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
