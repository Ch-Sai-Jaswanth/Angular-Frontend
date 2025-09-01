import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/login/login';
import { HttpClient } from '@angular/common/http';
import { Registration } from './components/registration/registration';
import { Dashboard } from './components/dashboard/dashboard';
import { Navbar } from './components/navbar/navbar';
import { BikeForm } from './components/bike-form/bike-form';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeliveryForm } from './components/delivery-form/delivery-form';
import { DealerForm } from './components/dealer-form/dealer-form';
import { DealerList } from './components/dealer-list/dealer-list';
import { BikeList } from './components/bike-list/bike-list';
import { DealerMasterList } from './components/dealermaster-list/dealermaster-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Registration, Dashboard, Navbar, BikeForm, ReactiveFormsModule, CommonModule, DeliveryForm, DealerForm,
    DealerList, BikeForm, BikeList, DealerMasterList
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'BikeDealersTest';
}
