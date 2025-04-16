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
    if(this.email=="" || this.password==""){
      alert("Fields can not be empty!!");
    }
    else if(this.email=="rakeshxyz62@gmail.com" && this.password=="123"){
      this.appState.setLoginStatus(true)

    }else{
      alert("You are not a part of our Community!!\nPlease Register!!");
    }
    console.log("Email: "+this.email+"  Password: "+this.password)
  }
}
