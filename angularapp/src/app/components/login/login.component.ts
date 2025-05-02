import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

<<<<<<< HEAD
    if (loginUser.Email && loginUser.Password) {
      this.authService.login(loginUser).subscribe({
        next: user => {
          if (this.authService.isAdmin()) {
            console.log("navigating to admin");
            this.router.navigate(['/admin']);
          } else if (this.authService.isUser()) {
            console.log("navigating to user");
            this.router.navigate(['/user']);
          }
        },
        error: err => {
          console.error('Login failed', err);
          alert("Login failed. Please check your credentials and try again.");
        }
      });
    } else {
      return;
    }
  }
}
=======
  constructor() {}
  
}
>>>>>>> b10dfc60dc99de4db0d7ecb598188718570d2977
