import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  constructor(
    public menuService: MenuService,
  ) { }

  items: MenuItem[] = [];
  public display?: boolean;
  ngOnInit(): void {
    this.items = this.menuService.itemsMenu();
    this.display = this.menuService.display;
  }

}
