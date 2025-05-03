
import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> f676c4cbf7e504b1c98afb9fd928cabae364b8b0
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  
<<<<<<< HEAD
  constructor(private authService: AuthService, private router: Router) { }
=======
  constructor(private authService: AuthService) { }
>>>>>>> f676c4cbf7e504b1c98afb9fd928cabae364b8b0
 
  user: User = {
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  }
  
  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.user = JSON.parse(storedUser);
  }
 
  logout() {
    this.authService.logout();
<<<<<<< HEAD
    this.router.navigate(['/']);
=======
>>>>>>> f676c4cbf7e504b1c98afb9fd928cabae364b8b0
  }

}


