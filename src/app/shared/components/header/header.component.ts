import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:true,
  imports:[SharedModule]
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
