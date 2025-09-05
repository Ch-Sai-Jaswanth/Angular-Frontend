import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
type Role = 'Admin' | 'Producer' | 'Dealer' | 'User';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard {
  constructor(private router: Router) {}

  private accessMap: Record<Role, string[]> = {
    Admin: ['dealers', 'bikes', 'deliveries'],
    Producer: ['bikes'],
    Dealer: ['dealers'],
    User: []
  };

  navigateTo(module: string): void {
    const role = this.getUserRole();

    if (this.accessMap[role]?.includes(module)) {
      this.router.navigate([`/${module}/new`]);
    } else {
      alert('You are not authorized to add them.');
    }
  }

  getUserRole(): Role {
    const role = localStorage.getItem('role') as Role;
    const validRoles: Role[] = ['Admin', 'Producer', 'Dealer', 'User'];
    return validRoles.includes(role) ? role : 'User';
  }
}