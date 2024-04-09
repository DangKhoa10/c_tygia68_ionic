import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { notifications } from 'ionicons/icons';

@Component({
  selector: 'app-tygia68',
  templateUrl: './tygia68.page.html',
  styleUrls: ['./tygia68.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tygia68Page  {

  constructor() { 
    addIcons({notifications})
  }

  

}
