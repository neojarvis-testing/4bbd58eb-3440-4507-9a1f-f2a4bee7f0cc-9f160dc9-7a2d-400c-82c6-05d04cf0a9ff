import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  
  constructor(private authService: AuthService, private router: Router) { }
 
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
    this.router.navigate(['/']);
  }

}
