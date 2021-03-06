import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CustomRoutingModule} from './custom-routing.module';
import {CustomComponent} from './custom.component';

@NgModule({
    imports: [CommonModule, CustomRoutingModule,NgbModule,FormsModule,ReactiveFormsModule,],
    declarations: [CustomComponent]
})
export class CustomModule {}