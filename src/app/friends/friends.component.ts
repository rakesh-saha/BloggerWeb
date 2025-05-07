import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

interface Friends {
  email: string;
  isFollowing: boolean;
  name: string;
  profileImage: string | ArrayBuffer | null;
}
@Component({
  selector: 'app-friends',
  imports: [CommonModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  constructor(private http: HttpClient) {
    this.loadFriends(this.pageNum);

  }

  friends: Friends[] = [];
  loading = signal(true);
  pageNum: number = 1;
  onePlus: number = 1;
  oneMinus: number = -1;
  maxPage: number = Infinity;
  temp:number=6;

  async loadFriends(pageNum: number): Promise<void> {
    const emailAddress = localStorage.getItem("email");
    if (emailAddress) {
      this.loading = signal(true);
      try {
        const res = await lastValueFrom(this.fetchAllFriends(emailAddress, pageNum));
        this.friends = [...res];
        this.temp = res.length;
        console.log(res);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = signal(false);
      }
    }
  }
  
  toggleFollow(friend: Friends) {
    const myEmail = localStorage.getItem("email");
    if (myEmail != null) {
      this.addRemoveFriend(myEmail, friend.email, friend.isFollowing).subscribe({
        next: (res) => {
          console.log(res);
          friend.isFollowing = !friend.isFollowing;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  async pageChange(num: number) {
    console.log("Before " + num + " " + this.pageNum + "  " + this.maxPage + " " + this.temp);
  
    if (this.pageNum < 2 && num === -1) return;
    if (this.pageNum >= this.maxPage && num === 1) return;
  
    this.pageNum += num;
  
    await this.loadFriends(this.pageNum); 
  
    if (this.temp < 6) {
      this.maxPage = this.pageNum;
    }
  
    console.log(num + " " + this.pageNum + " " + this.maxPage + " " + this.temp);
  }
  

  private baseUrl = "http://localhost:8080";

  fetchAllFriends(email: string, pageNum: number): Observable<Friends[]> {
    return this.http.get<Friends[]>(`${this.baseUrl}/friends/${email}?pageNum=${this.pageNum}`);
  }

  addRemoveFriend(email: string, followerEmail: string, isFollowing: boolean): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.baseUrl}/addRemoveFriend/${email}?followerEmail=${followerEmail}&isFollowing=${isFollowing}`,
      null
    );
  }



}
