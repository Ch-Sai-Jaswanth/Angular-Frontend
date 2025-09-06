import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Login } from '../login/login';
import { Registration } from '../registration/registration';
import { Dashboard } from '../dashboard/dashboard';
import { DealerList } from '../dealer-list/dealer-list';
import { BikeList } from '../bike-list/bike-list';
import { DealerMasterList } from '../dealermaster-list/dealermaster-list';
import { User } from '../../services/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, Login, Registration, Dashboard, DealerList, BikeList, DealerMasterList],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private authService: AuthService, private userService: User) {}

  username: string | null = '';

  ngOnInit() {
    this.userService.username$.subscribe(name => {
      this.username = name;
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string {
    return localStorage.getItem('role') || 'User';
  }

  logout() {
    Swal.fire('Success!', 'Logged out successfully', 'success');
    this.authService.logout();
  }
}