//Módulos y componentes propios de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Módulos 
import { AppRoutingModule } from '../app-routing.module';

//Componentes
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { PopularComponent } from './popular/popular.component';
import { LibraryComponent } from './library/library.component';
import { DiscoverComponent } from './discover/discover.component';
import { DetailsComponent } from './details/details.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


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
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
  
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    NewsComponent,
    PopularComponent,
    LibraryComponent,
    DiscoverComponent,
  ]
})

export class ComponentsModule { }