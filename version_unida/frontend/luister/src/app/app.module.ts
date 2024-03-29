import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApibindingService } from './services/apibinding.service';
import { ValidationsService } from './services/validations.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
  ],
  providers: [ApibindingService, ValidationsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
