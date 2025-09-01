import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class authGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const token = localStorage.getItem('token');
//     if (token) return true;

//     this.router.navigate(['/login']);
//     return false;
//   }
// }

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) return true;

  router.navigate(['/login']);
  return false;
};
