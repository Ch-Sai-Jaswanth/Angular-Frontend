import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role') || 'User';
  
  const accessMap: Record<string, Record<string, string[]>> = {
    Admin: {
      dashboard: ['view'],
      dealers: ['view', 'new', 'edit', 'details'],
      bikes: ['view', 'new', 'edit', 'details'],
      deliveries: ['view', 'new', 'edit', 'details']
    },
    Producer: {
      dashboard: ['view'],
      bikes: ['view', 'new', 'edit', 'details'],
      dealers: ['view', 'details'],
      deliveries: ['view', 'details']
    },
    Dealer: {
      dashboard: ['view'],
      dealers: ['view', 'new', 'edit', 'details'],
      bikes: ['view', 'details'],
      deliveries: ['view', 'details']
    },
    User: {
      dashboard: ['view'],
      dealers: ['view', 'details'],
      bikes: ['view', 'details'],
      deliveries: ['view', 'details']
    }
  };

  const module = route.url[0]?.path; 
  const action = route.url[1]?.path || 'view';

  if (token && module && accessMap[role]?.[module]?.includes(action)) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};

// export const authGuard: CanActivateFn = () => {
//   const router = inject(Router);
//   const token = localStorage.getItem('token');

//   if (token) return true;

//   router.navigate(['/login']);
//   return false;
// };

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