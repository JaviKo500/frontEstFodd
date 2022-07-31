import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';

@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    CardModule,
    ConfirmPopupModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    MenuModule,
    SidebarModule,
    TableModule,
    ToolbarModule,
  ]
})
export class PrimeNgModule { }
