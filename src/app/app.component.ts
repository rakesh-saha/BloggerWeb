import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { AppStateService } from './app-state.service';
import { Router } from '@angular/router';
import { LoginNavComponent } from "./login-nav/login-nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, NavbarComponent, CommonModule, LoginNavComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BloggerWeb';
  isLoggedIn:boolean = false;

  constructor(private appState: AppStateService, private router: Router) {
    this.appState.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if(this.isLoggedIn==true){
        this.router.navigate(['/dashboard']);
      }
      else{
        this.router.navigate(['/home']);
      }
    });
  }
  
}
