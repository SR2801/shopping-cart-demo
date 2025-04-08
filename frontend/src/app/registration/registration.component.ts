import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import {  CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [FormsModule, CommonModule]
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  errors: string[] = [];
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
        this.errors = [];
        console.log(this.user)
        console.log('Registration successful', response);
        // this.router.navigate(['/login']); 
      },
      error: (err:any) => {
        this.isSuccessful = false;
        this.errors = [];
        // this.errorMessage = `Registration failed. Please try again. ${JSON.stringify(err.error.error[0]).slice(1, -1)}`;
        // this.errorMessage = `Registration failed. Please try again. Causes: ${this.getErrorString(err.error.errors)}`;
        this.errorMessage = `Registration failed. Please try again. Causes: `;
        this.getErrorString(err.error.errors);
        console.error(err);
      }
    });
  }

  private getErrorString(err: any):string {
    var errorString = "";
    if(err.email){
      errorString = "The E-mail " + JSON.stringify(err.email).slice(2, -2);
      this.errors.push(errorString);
    }
    if(err.password){
      errorString = "The password doesn't follow the Password Policy: " + JSON.stringify(err.password).slice(2, -2);
      this.errors.push(errorString);
    }
    if(err.password_confirmation){
      errorString = "The Password confirmation "+  JSON.stringify(err.password_confirmation).slice(2, -2);
      this.errors.push(errorString);
    }
    return errorString;
  }
}
