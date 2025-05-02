<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
=======
import { Component } from '@angular/core';

>>>>>>> b10dfc60dc99de4db0d7ecb598188718570d2977

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
<<<<<<< HEAD
export class RegistrationComponent implements OnInit {

  roles: string[] = ['Admin', 'User'];
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobileNumber: string = '';
  userrole: string = '';

  formSubmitted:boolean=false;
  
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
  }
  
  register(): void {
    this.formSubmitted=true;
      const newUser: User = {
        Username: this.username,
        Email: this.email,
        Password: this.password,
        MobileNumber: this.mobileNumber,
        UserRole: this.userrole
      };
      
      if(newUser.Username && newUser.Email && newUser.Password && newUser.MobileNumber && newUser.UserRole)
      {
        this.authService.register(newUser).subscribe(() => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        });
        console.log(newUser);
      }
      else{
        return;
      }
  }

  validatePassword(): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return this.password ? regex.test(this.password) : false;
  }

  checkpassword():boolean
  {
    if(this.password == this.confirmPassword)
    {
      return false;
    }
    else{
      return true;
    }
  }
}
=======
export class RegistrationComponent {


  constructor() { }
}

>>>>>>> b10dfc60dc99de4db0d7ecb598188718570d2977
