import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { PopularComponent } from './components/popular/popular.component';
import { LibraryComponent } from './components/library/library.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { SigninSignupComponent } from './components/signin-signup/signin-signup.component';

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
    path: 'discover',
    component: DiscoverComponent
  },
  {
    path: 'signin-signup',
    component: SigninSignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
