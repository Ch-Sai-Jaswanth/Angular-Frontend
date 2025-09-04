import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
  private usernameSource = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  username$ = this.usernameSource.asObservable();

  setUsername(username: string) {
    localStorage.setItem('username', username);
    this.usernameSource.next(username);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  // getUsername(): string | null {
  //   return localStorage.getItem('name');
  // }

  // setUsername(username: string) {
  //   localStorage.setItem('name', username);
  // }
}
