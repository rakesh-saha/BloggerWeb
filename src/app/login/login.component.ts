import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppStateService } from '../app-state.service';

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
  constructor(private appState: AppStateService){

  }
  onSubmit(){
    this.appState.setLoginStatus(true)
    console.log("Email: "+this.email+"  Password: "+this.password)
  }
}
