import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  LAZYLOAD_IMAGE_HOOKS,
  LazyLoadImageModule,
  ScrollHooks,
} from 'ng-lazyload-image';
const Modules = [
  IonicModule,
  CommonModule,
  FormsModule,
  RouterModule,
  LazyLoadImageModule,
];
const Components: any = [];
const pipes: any = [];
@NgModule({
  imports: [...Components, ...pipes],
  exports: [...Modules, ...Components, ...pipes],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }], // <-- Declare that you want to use ScrollHooks
})
export class SharedModule {}
