import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { error } from 'console';
import { Observable } from 'rxjs';

interface UserProfile {
  profileImage: string | ArrayBuffer | null;
  name: string;
  email: string;
  phone: string;
  about: string;
  interests: string[];
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private http:HttpClient){
    const myEmail =  localStorage.getItem("email");
    if(myEmail){
      this.loadData(myEmail).subscribe({
        next:(res)=>{
          console.log('Fetch successfully:', res);
          this.name = res.name;
          this.profileImage = res.profileImage;
          this.email = res.email;
          this.phone = res.phone;
          this.about = res.about;
          this.interests = res.interests;
        },
        error:(err)=>{
          console.error('Fetch failed:', err)
        }
      });

    }
  }
  profileImage: string | ArrayBuffer | null = null;

  name: string = '';
  email: string = '';
  phone: string = '';
  about: string = '';
  interests: string[] = [];

  
  private baseUrl = "http://localhost:8080";
  loadData(email: string): Observable<UserProfile>{
    email:localStorage.getItem("email");
    return this.http.get<UserProfile>(`${this.baseUrl}/get/${email}`);
  }

}
