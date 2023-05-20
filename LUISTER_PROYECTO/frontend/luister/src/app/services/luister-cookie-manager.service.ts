import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LuisterCookieManagerService {

  constructor() {}

  set(key='',value='', path='/',expdays=7){
    const expiration = (new Date(new Date().getTime() + expdays * 24 * 60 * 60 *1000));
    document.cookie = `${key}=`+encodeURIComponent(value)+`; expires=${expiration}; path=${path};`;
  }
  get(key:string){
    let value='', counter=0, cookie=[];
    const cookies = document.cookie.split('; ');

    do{
        if(key == cookies[counter].split('=').shift()){
          cookie = cookies[counter].split('=');
          value = decodeURIComponent(cookie[cookie.length - 1]);
        }
      counter++;
    } while (counter < cookies.length && !value);

    return value;
  }
  check(key:string){
    let result=false, counter=0;
    const cookies = document.cookie.split('; ');
    do{
        if(key == cookies[counter].split('=').shift()){
          result = true;
        }
      counter++;
    } while (counter < cookies.length && !result);

    return result;
  }
  delete(key:string, path='/'){
    document.cookie = `${key}=; max-age=0; path=${path}`;
  }
}
