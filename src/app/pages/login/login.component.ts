import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(response => {
      console.log('Login successful', response);
      this.router.navigate(['/home']);
    }, error => {
      console.error('Login error', error);
      this.errorMessage = error.error.message || 'Login failed';
    });
  }
}
