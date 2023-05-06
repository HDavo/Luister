import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { PopularComponent } from './components/popular/popular.component';
import { LibraryComponent } from './components/library/library.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { DetailsComponent } from './components/details/details.component';

import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'popular',
    component: PopularComponent
  },
  {
    path: 'library',
    component: LibraryComponent
  },
  {
    path: 'library/list/:id',
    component: LibraryComponent
  },
  {
    path: 'discover',
    component: DiscoverComponent
  },
  {
    path: 'details/:element/:id',
    component: DetailsComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
