import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminSecretKey } from 'src/app/constants';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  roles: string[] = ['Admin', 'User'];
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobileNumber: string = '';
  userrole: string = '';
  secretKey: string = '';
  wrongSecretKey: boolean = false;

  formSubmitted:boolean=false;
  
  constructor(public authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
  }
  
  register(): void {
    this.formSubmitted=true;
      const newUser: User = {
        Username: this.username,
        Email: this.email,
        Password: this.password,
        MobileNumber: this.mobileNumber,
        UserRole: this.userrole,
      };
      
      if((newUser.Username && newUser.Email && newUser.Password && newUser.MobileNumber && newUser.UserRole) && newUser.UserRole == "User")
      {
        if(this.validatePassword() && !this.checkpassword()){
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
      else if((newUser.Username && newUser.Email && newUser.Password && newUser.MobileNumber && newUser.UserRole) && newUser.UserRole == "Admin")
      {
        if(this.secretKey != AdminSecretKey){
          this.wrongSecretKey = true;
          return;
        }
        if(this.validatePassword() && !this.checkpassword()){
          this.authService.register(newUser).subscribe(()=>{
              alert('Registration successful!');
              this.router.navigate(['/login']);
          });
          console.log(newUser);
        }
        else{
          return;
        }
      }
      else{
        return;
      }
  }

  removeError(): void{
    this.wrongSecretKey = false;
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