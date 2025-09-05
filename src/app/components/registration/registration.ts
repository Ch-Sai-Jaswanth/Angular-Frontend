import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          // Handle success response properly
          if (res?.text) {
            this.successMessage = res.text;
          } else {
            this.successMessage = 'Registration successful!';
          }
          this.errorMessage = '';
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: err => {
          // Handle error response gracefully
          const error = err.error;
          if (typeof error === 'string') {
            this.errorMessage = error;
          } else if (error?.text) {
            this.successMessage = error.text;
            this.errorMessage = '';
            this.registerForm.reset();
          } else {
            this.errorMessage = 'Registration failed.';
            this.successMessage = '';
          }
        }
      });
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
  }

