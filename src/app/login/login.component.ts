import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppStateService } from '../app-state.service';
import { HttpClient} from '@angular/common/http';

interface LoginUser {
  email: string;
  name: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [RouterModule,FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string =''
  password: string =''
  loginUrl = 'http://localhost:8080/login';
  constructor(
    private appState: AppStateService,
    private http:HttpClient
  ){}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
      name: '' 
    };
  
    this.http.post<LoginUser>(this.loginUrl, loginData).subscribe({
      next: (response) => {
        this.appState.setLoginStatus(true);
      },
      error: (err) => {
        if (err.status === 401) {
          alert("Email or password is wrong!");
        } else {
          alert("Something went wrong!");
        }
      }
    });
  }
}