import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule,FormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = ''
  email: string = ''
  password: string = ''

  onSubmit(){
    console.log("Name: "+this.name+" | Email: "+this.email+" | Password: "+this.password)
  }
}
