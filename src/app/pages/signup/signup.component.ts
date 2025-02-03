import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.username, this.password).subscribe(response => {
      console.log('Registration successful', response);
      this.login();
    }, error => {
      console.error('Registration error', error);
      this.errorMessage = error.error.message || 'Registration failed';
    });
  }

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
