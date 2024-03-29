import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApibindingService } from './services/apibinding.service';
import { ValidationsService } from './services/validations.service';
import { ContexMenu } from './services/contextMenu';
import { LuisterApiService } from './services/luister-api.service';
import { LastFmService } from './services/last-fm.service';
import { LuisterCookieManagerService } from './services/luister-cookie-manager.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    ApibindingService,
    ValidationsService,
    ContexMenu,
    LuisterApiService,
    LastFmService,
    LuisterCookieManagerService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  
}
