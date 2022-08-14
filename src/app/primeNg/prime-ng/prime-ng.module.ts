import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {GalleriaModule} from 'primeng/galleria';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {PasswordModule} from 'primeng/password';
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';


@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ConfirmPopupModule,
    DialogModule,
    DropdownModule,
    GalleriaModule,
    FileUploadModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    MenuModule,
    PasswordModule,
    SidebarModule,
    TableModule,
    ToolbarModule,
  ]
})
export class PrimeNgModule { }
