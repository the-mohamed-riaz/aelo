import { ActivatorGuard } from './guard/activator.guard';
import { ModulesLoaderGuard } from './guard/modules-loader.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'transaction', loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule), canLoad: [ModulesLoaderGuard], canActivate: [ActivatorGuard] },
  { path: 'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule), canLoad: [ModulesLoaderGuard], canActivate: [ActivatorGuard] },
  { path: '', redirectTo: 'login', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
