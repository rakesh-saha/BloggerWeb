// src/app/profile/profile.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.email = 'rakesh@gmail.com';
  }

  profileImage: string | ArrayBuffer | null = null;

  name: string = '';
  email: string = '';
  phone: string = '';
  about: string = '';
  interests: string[] = [];

  updateButton: string = 'Edit';
  isReadonly: boolean = true;
  addInterest: string = ''

  addMyInterest() {
    if(this.addInterest!="")
    this.interests.push(this.addInterest);
    this.addInterest="";
  }
  removeInterest(index: number) {
    this.interests.splice(index, 1);
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      if (!validImageTypes.includes(file.type)) {
        alert('Only image files (JPG, JPEG, PNG, WEBP) are allowed.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(inputElement: HTMLInputElement): void {
    if(this.isReadonly==false)
    inputElement.click();
  }
  profileUpdate() {
    const userProfile: UserProfile = {
      profileImage: this.profileImage as string,
      name: this.name,
      email: this.email,
      phone: this.phone,
      about: this.about,
      interests: this.interests,
    }
    if (this.updateButton === 'Update') {
      this.isReadonly = !this.isReadonly;
      this.updateProfile(this.email, userProfile).subscribe({
        next: (res) => console.log('Updated successfully:', res),
        error: (err) => console.error('Update failed:', err),
      });
      this.updateButton = 'Edit';
    } else {
      this.getProfile(this.email).subscribe({
        next: (res) => {
          console.log('Fetch successfully:', res);
          this.name = res.name;
          this.profileImage = res.profileImage;
          this.email = res.email;
          this.phone = res.phone;
          this.about = res.about;
          this.interests = res.interests;
          this.changeDetectorRef.detectChanges();
        },
        error: (err) => console.error('Fetch failed:', err),
      });
      this.updateButton = 'Update';
      this.isReadonly = !this.isReadonly;
    }
  }

  private baseUrl = "http://localhost:8080";

  getProfile(email: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/get/${email}`);
  }

  updateProfile(email: string, userProfile: UserProfile): Observable<UserProfile> {
    console.log("called");
    return this.http.put<UserProfile>(`${this.baseUrl}/update/${email}`, userProfile);
  }
}
