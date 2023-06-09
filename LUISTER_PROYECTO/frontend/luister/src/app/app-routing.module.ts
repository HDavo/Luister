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
import { NewpasswordComponent } from './components/newpassword/newpassword.component';
import { AccountComponent } from './components/account/account.component';
import { ListComponent } from './components/list/list.component';

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
    component: ListComponent,
    canActivate: [noAuthGuard]
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
    // canActivate: [authGuard]
  },
  {
    path: 'set-your-password/:token',
    component: NewpasswordComponent,
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
    path: 'user/:section',
    component: AccountComponent,
    canActivate: [noAuthGuard]
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
