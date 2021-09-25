import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { SemanticDdComponent } from './dropdown/semantic-dd/semantic-dd.component';
import { DropdownsService } from './DefaultValues/dropdowns.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    DropdownsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
