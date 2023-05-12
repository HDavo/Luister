import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { PopularComponent } from './popular/popular.component';
import { LibraryComponent } from './library/library.component';
import { DiscoverComponent } from './discover/discover.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MoreInfoComponent } from './more-info/more-info.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    NewsComponent,
    PopularComponent,
    LibraryComponent,
    DiscoverComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    MoreInfoComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    NewsComponent,
    PopularComponent,
    LibraryComponent,
    DiscoverComponent,
    LoginComponent,
    RegisterComponent,
  ]
})

export class ComponentsModule { }