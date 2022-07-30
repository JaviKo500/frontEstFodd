import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    MenuModule,
    SidebarModule,
    TableModule,
    ToolbarModule,
  ]
})
export class PrimeNgModule { }
