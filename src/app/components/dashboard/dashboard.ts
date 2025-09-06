import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
type Role = 'Admin' | 'Producer' | 'Dealer' | 'User';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard {
  role: Role = 'User';
  accessCode: string | null = null;

  ngOnInit(): void {
    this.role = this.getUserRole();

    if (this.role === 'Admin') {
      this.accessCode = localStorage.getItem('adminAccessCode') || 'p@$$c0]3';
    }
  }


  private accessMap: Record<Role, string[]> = {
    Admin: ['dealers', 'bikes', 'deliveries'],
    Producer: ['bikes'],
    Dealer: ['dealers'],
    User: []
  };

  constructor(private router: Router) {}

  getUserRole(): Role {
    const role = localStorage.getItem('role') as Role;
    const validRoles: Role[] = ['Admin', 'Producer', 'Dealer', 'User'];
    return validRoles.includes(role) ? role : 'User';
  }

  canAccess(module: string): boolean {
    return this.accessMap[this.role]?.includes(module);
  }

  navigateTo(module: string): void {
    if (this.canAccess(module)) {
      this.router.navigate([`/${module}/new`]);
    } else {
        Swal.fire('Oops!', 'You are not authorized!!', 'error');
    }
  }
}