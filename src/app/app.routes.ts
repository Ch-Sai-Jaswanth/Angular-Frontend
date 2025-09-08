import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Dashboard } from './components/dashboard/dashboard';
import { BikeForm } from './components/bike-form/bike-form';
import { DealerList } from './components/dealer-list/dealer-list';
import { BikeList } from './components/bike-list/bike-list';
import { DealerForm } from './components/dealer-form/dealer-form';
import { Login } from './components/login/login';
import { Registration } from './components/registration/registration';
import { DeliveryForm } from './components/delivery-form/delivery-form';
import { DealerMasterList } from './components/dealermaster-list/dealermaster-list';
import { EditDealer } from './components/edit-dealer/edit-dealer';
import { EditBike } from './components/edit-bike/edit-bike';
import { EditDealermaster } from './components/edit-dealermaster/edit-dealermaster';
import { BikeDetails } from './components/bike-details/bike-details';
import { DealerDetails } from './components/dealer-details/dealer-details';
import { DealermasterDetails } from './components/dealermaster-details/dealermaster-details';
import { guestGuard } from './guards/guest-guard';
import { Unauthorized } from './components/unauthorized/unauthorized';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard]
    },
    {
        path: 'bikes',
        component: BikeList,
        canActivate: [authGuard]
    },
    {
        path: 'bikes/new',
        component: BikeForm,
        canActivate: [authGuard]
    },
    {
        path: 'bikes/edit/:id',
        component: EditBike,
        canActivate: [authGuard]
    },
    {
        path: 'bikes/details/:id',
        component: BikeDetails,
        canActivate: [authGuard]
    },
    {
        path: 'dealers',
        component: DealerList,
        canActivate: [authGuard]
    },
    {
        path: 'dealers/new',
        component: DealerForm,
        canActivate: [authGuard]
    },
    {
        path: 'dealers/edit/:id',
        component: EditDealer,
        canActivate: [authGuard]
    },
    {
        path: 'dealers/details/:id',
        component: DealerDetails,
        canActivate: [authGuard]
    },
    {
        path: 'deliveries',
        component: DealerMasterList,
        canActivate: [authGuard]
    },
    {
        path: 'deliveries/new',
        component: DeliveryForm,
        canActivate: [authGuard]
    },
    {
        path: 'deliveries/edit/:id',
        component: EditDealermaster,
        canActivate: [authGuard]
    },
    {
        path: 'deliveries/details/:id',
        component: DealermasterDetails,
        canActivate: [authGuard]
    },
    {
        path: 'unauthorized',
        component: Unauthorized
    },
    { path: 'login', component: Login, canActivate: [guestGuard] },
    { path: 'register', component: Registration, canActivate: [guestGuard] },
    { path: '**', redirectTo: 'dashboard' }
];
