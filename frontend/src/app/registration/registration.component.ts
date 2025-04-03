import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import {  NgIf } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [FormsModule, NgIf]
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isSuccessful: boolean = false;

  user = { email: "", password: "", password_confirmation: "" };

  constructor(private authService: AuthService, private router: Router) {}
  OnInit(){
    this.isSuccessful = false;
  }

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: (response:any) => {
        this.isSuccessful = true;
        this.errorMessage = '';
        console.log(this.user)
        console.log('Registration successful', response);
        // this.router.navigate(['/login']); 
      },
      error: (err:any) => {
        this.isSuccessful = false;
        this.errorMessage = `Registration failed. Please try again. ${JSON.stringify(err.error.error[0]).slice(1, -1)}`;
        console.error(err);
      }
    });
  }
}
