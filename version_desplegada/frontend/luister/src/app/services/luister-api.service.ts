import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LuisterApiService {

  private URL: string = environment.altwebapi;

  @Output() deletedList:EventEmitter<any> = new EventEmitter();
  @Output() updateList: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) {}

  signIn(data:any):Observable<any>{
    return this.http.post(`${this.URL}login.php`, data)
  }
  signUp(data:any):Observable<any>{
    return this.http.post(`${this.URL}register.php`, data)
  }
  logOut(session:string):Observable<any>{
    return this.http.post(`${this.URL}logout.php`, { session })
  }
  getUserCustomList(userid:number):Observable<any>{
    return this.http.get(`${this.URL}customlists.php?userid=${userid}`);
  }
  getCustomList(id:number):Observable<any>{
    return this.http.get(`${this.URL}customlist.php?id=${id}`);
  }
  getCustomListTracks(id:number):Observable<any>{
    return this.http.get(`${this.URL}customlisttracks.php?id=${id}`);
  }
  addCustomList(customlist:any):Observable<any>{
    return this.http.post(`${this.URL}newcustomlist.php`, customlist);
  }
  deleteCustomList({clid='', userid=''}):Observable<any>{
    return this.http.post(`${this.URL}deletelist.php`, {
      customlistid: clid,
      userid: userid
    });
  }
  passwordResetRequest(email:string):Observable<any>{
    return this.http.post(`${this.URL}resetpassword.php`, {
      accountemail: email,
    });
  }
  setNewPassword(data:any):Observable<any>{
    return this.http.post(`${this.URL}setnewpassword.php`, data);
  }
  addTrackToList(data:any):Observable<any>{
    return this.http.post(`${this.URL}addtracktolist.php`, data);
  }
  isValidSession(data: string):Observable<any>{
    return this.http.post(`${this.URL}validsession.php`, {
      sessiontoken: data
    });
  }
  getFavTracks(userid:number):Observable<any>{
    return this.http.post(`${this.URL}favtracks.php`, {userid});
  }
  addFavTracks(data:any):Observable<any>{
    return this.http.post(`${this.URL}addfavtrack.php`, data);
  }
  followUnfollow(data:any):Observable<any>{
    return this.http.post(`${this.URL}followartist.php`, data);
  }
  follow(data:any):Observable<any>{
    return this.http.post(`${this.URL}justfollow.php`, data);
  }
  unfollow(data:any){
    return this.http.post(`${this.URL}justunfollow.php`, data);
  }
  removeFavTracks(data:any):Observable<any>{
    return this.http.post(`${this.URL}removefavtrack.php`, data);
  }
  getFollowedLiked(data:any):Observable<any>{
    return this.http.post(`${this.URL}followedliked.php`, data);
  }
  contactus(data:any):Observable<any>{
    return this.http.post(`${this.URL}contactus.php`, data);
  }
  exportlist(listid:number, userid:number):Observable<any>{
    return this.http.get(`${this.URL}exportlist.php?listid=${listid}&userid=${userid}`);
  }
  getFollowedArtists(userid:number):Observable<any>{
    return this.http.get(`${this.URL}followedartists.php?userid=${userid}`);
  }
}
