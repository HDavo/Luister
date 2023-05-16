import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { PopularComponent } from './components/popular/popular.component';
import { LibraryComponent } from './components/library/library.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { DetailsComponent } from './components/details/details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MoreInfoComponent } from './components/more-info/more-info.component';
import { noAuthGuard, authGuard } from './services/luister-guard.guard';

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
    component: LibraryComponent,
    canActivate: [noAuthGuard]
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
    component: RegisterComponent,
    canActivate: [authGuard]
  },
  {
    path: 'signin',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: 'more-info/:section',
    component: MoreInfoComponent
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
