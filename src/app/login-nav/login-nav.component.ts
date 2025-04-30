import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-login-nav',
  imports: [RouterModule],
  templateUrl: './login-nav.component.html',
  styleUrl: './login-nav.component.css'
})
export class LoginNavComponent {

  constructor(private AppState: AppStateService){

  }
  OnLogout(){
    console.log("Logged out!!");
    localStorage.clear();
    this.AppState.setLoginStatus(false);    
  }
}
