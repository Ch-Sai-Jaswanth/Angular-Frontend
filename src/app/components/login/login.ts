import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private userService: User) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  newUser() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        this.userService.setUsername(res.username || this.loginForm.value.username);

        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: `Hello ${res.username || this.loginForm.value.username}, you're now logged in.`,
          timer: 2000,
          showConfirmButton: false
        });

        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.errorMessage = 'Login failed.';
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: this.errorMessage,
          confirmButtonText: 'Try Again'
        });
      }
    });
      // this.authService.login(this.loginForm.value).subscribe({
      //   next: (res: any) => {
      //     localStorage.setItem('token', res.token);
      //     localStorage.setItem('role', res.role);
      //     this.userService.setUsername(res.username || this.loginForm.value.username);
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error: err => {
      //     this.errorMessage = err.error || 'Login failed.';
      //   }
      // });
    }
  }
}
