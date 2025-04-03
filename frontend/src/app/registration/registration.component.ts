import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [FormsModule]
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  user = { email: '', password: '', password_confirmation: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: (response:any) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']); 
      },
      error: (err:any) => {
        this.errorMessage = `Registration failed. Please try again. ${JSON.stringify(err.message)}`;
        console.error(err);
      }
    });
  }
}
