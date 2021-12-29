import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './../shared/materials/materials.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SettingsHomeComponent } from './settings-home/settings-home.component';


@NgModule({
  declarations: [
    ResetPasswordComponent,
    SettingsHomeComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ResetPasswordComponent,
    SettingsHomeComponent
  ]
})
export class SettingsModule { }
