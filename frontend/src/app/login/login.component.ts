import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
onRegister() {
  this.router.navigate(['/register']);
}
navigateToCarts() {
  this.router.navigate(['/carts'])
}
    email:string = '';
    password:string = '';
    error: string = '';

  constructor(private authService: AuthService, private router: Router){}
  onSubmit() {
      this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        // Assuming you handle the JWT token and user login here
        console.log('Login successful', response);
        this.router.navigate(['/carts']);  // Navigate to the cart page after successful login
      },
      (error: any) => {
        this.error = (JSON.stringify(error.error.error)).slice(1, -1);
        console.log('Login failed', error);
      }
    );
  }

}
