import { Component ,Inject,OnInit, PLATFORM_ID} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AppStateService } from './app-state.service';
import { Router } from '@angular/router';
import { LoginNavComponent } from "./login-nav/login-nav.component";
import { NgModel } from '@angular/forms';
import { emit } from 'process';

@Component({
  selector: 'app-root',
  imports: [RouterModule, NavbarComponent, CommonModule, LoginNavComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'BloggerWeb';
  isLoggedIn:boolean = false;

  constructor(private appState: AppStateService, private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
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
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const email = localStorage.getItem("email");
      if (email) {
        this.appState.setLoginStatus(true);
      }
    }
  }
  
  
}
