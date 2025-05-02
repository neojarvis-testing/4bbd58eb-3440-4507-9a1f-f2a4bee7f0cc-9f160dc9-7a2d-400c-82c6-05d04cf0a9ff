import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  constructor(private authService: AuthService) { }
 
  user: User = {
    UserId: 0,
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
  }
}





<<<<<<< HEAD
=======


>>>>>>> 9ecb8e18ce53a9260bed8b937339c93d6a0fc4f1
