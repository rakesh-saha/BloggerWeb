import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private email = new BehaviorSubject<string>("");
  email$ = this.email.asObservable();


  setEmail(status:string){
    this.email.next(status);
  }

  setLoginStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }
}
