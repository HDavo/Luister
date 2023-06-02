import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Para poder usar material
import { MaterialModule } from '../material/material.module';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { PopularComponent } from './popular/popular.component';
import { LibraryComponent } from './library/library.component';
import { DiscoverComponent } from './discover/discover.component';
import { AppRoutingModule } from '../app-routing.module';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MoreInfoComponent } from './more-info/more-info.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { AccountComponent } from './account/account.component';
import { ListComponent } from './list/list.component';


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
    MoreInfoComponent,
    NewpasswordComponent,
    AccountComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
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
  ]
})

export class ComponentsModule { }
