import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class Registration {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['User', Validators.required]
    });
  }

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
          this.authService.register(this.registerForm.value).subscribe({
          next: (res: string) => {
          console.log("Raw register response:", res);

          const normalized = res.trim().toLowerCase();

          if (normalized.includes("created")) {
            Swal.fire('Success!', res, 'success').then(() => {
              this.router.navigate(['/login']);
            });
            this.successMessage = res;
            this.errorMessage = '';
            this.registerForm.reset();
          } else {
            Swal.fire('Error', res, 'error');
            this.errorMessage = res;
            this.successMessage = '';
          }
        },
          error: err => {
            console.error("Register error:", err);
            this.errorMessage = 'Registration failed.';
            this.successMessage = '';
          }
          });
        }
    }
  }
    // if (this.registerForm.valid) {
    //   this.authService.register(this.registerForm.value).subscribe({
    //     next: () => {
    //       this.successMessage = 'Registration successful!';
    //       this.errorMessage = '';
    //       this.registerForm.reset();
    //     },
    //     error: err => {
    //       this.errorMessage = JSON.stringify(err.error) || 'Registration failed.';
    //       this.successMessage = '';
    //     }
    //   });
    // }

  // this.authService.register(this.registerForm.value).subscribe({
  //       next: (res: any) => {
  //         // Handle success response properly
  //         if (res?.text) {
  //           this.successMessage = res.text;
  //         } else {
  //           this.successMessage = 'Registration successful!';
  //         }
  //         this.errorMessage = '';
  //         this.registerForm.reset();
  //         Swal.fire('Success!', 'Registered successfully', 'success');
  //         this.router.navigate(['/login']);
  //       },
  //       error: err => {
  //         // Handle error response gracefully
  //         const error = err.error;
  //         if (typeof error === 'string') {
  //           this.errorMessage = error;
  //         } else if (error?.text) {
  //           this.successMessage = error.text;
  //           this.errorMessage = '';
  //           this.registerForm.reset();
  //         } else {
  //           this.errorMessage = 'Registration failed.';
  //           this.successMessage = '';
  //         }
