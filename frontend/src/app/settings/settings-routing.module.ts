import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsHomeComponent } from './settings-home/settings-home.component';

const routes: Routes = [

  { path: '', component: SettingsHomeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
