import { CommonModule } from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PaymentFormComponent } from 'src/app/component/payment-form/payment-form.component';
import { LionFieldset } from '@lion/fieldset';
const importsExports = [
  FormsModule,
  PaymentFormComponent
];

const declarationsAndExport = [
  PaymentFormComponent
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [...importsExports],
  declarations: [...declarationsAndExport],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
