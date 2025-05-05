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

  isUserDialogOpen: boolean = false;

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
    this.router.navigate(['/login']);
  }

  openDialog() {
    this.isUserDialogOpen = true;
    document.body.classList.add('dialog-open');
  }

  closeDialog() {
    this.isUserDialogOpen = false;
    document.body.classList.remove('dialog-open');
  }

}
