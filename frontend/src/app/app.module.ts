import { MaterialsModule } from './shared/materials/materials.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownsService } from './DefaultValues/dropdowns.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

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
    DropdownsService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
