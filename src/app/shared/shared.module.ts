import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
const Modules = [IonicModule, CommonModule, FormsModule, RouterModule];
const Components: any = [];
const pipes: any = [];
@NgModule({
  imports: [...Components, ...pipes],
  exports: [...Modules, ...Components, ...pipes],
})
export class SharedModule {}
