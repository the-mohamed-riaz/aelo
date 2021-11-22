import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DropdownsService } from './DefaultValues/dropdowns.service';
import { ActivatorGuard } from './guard/activator.guard';
import { ModulesLoaderGuard } from './guard/modules-loader.guard';
import { LoginInterceptor } from './interceptor/login.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialsModule } from './shared/materials/materials.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
    ActivatorGuard,
    ModulesLoaderGuard,
    DropdownsService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
