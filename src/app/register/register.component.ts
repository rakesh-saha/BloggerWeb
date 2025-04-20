import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { response } from 'express';

interface LoginUser {
  email: string;
  name: string;
  password: string;
}

@Component({
  selector: 'app-register',
  imports: [RouterModule,FormsModule,CommonModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  name: string = '' ;
  email: string = '' ;
  password: string = '' ; 
  emptyField:boolean=false;
  
  constructor(private http:HttpClient){}

  

  onSubmit(){

    if(this.name=="" || this.email=="" || this.password==""){
      this.emptyField=true;
      return;
    }else{
      this.emptyField=false;
    }

    const registerData={
      name:this.name,
      email:this.email,
      password:this.password
    }

    this.http.post('http://localhost:8080/register', registerData, { responseType: 'text' }).subscribe({
      next: (response) => {
        alert(response); 
      },
      error: (error) => {
        alert("Error While Registration!! " + error.message);
      }
    });
  }
}
