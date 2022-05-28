import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  API_URL: string = 'http://localhost:5000';
  passwordValidate: boolean = false;
  userEmail ;
  passwordMatch: boolean = false;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('email');
  }

  userRegisterForm: FormGroup = this.fb.group({
    oldpassword:['',Validators.required],
    password:['',Validators.required],
    confirmpassword:['',Validators.required],
  })
  tets(){
    this.authService.logoutUser();
  }

  validatePassword(){
    // console.log(this.passwordValidate)
    let password = this.userRegisterForm.value.password;
    var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(!regularExpression.test(password)) {
      this.passwordValidate = false;
    }else{
      this.passwordValidate = true;
    }
  }

  confirmPassword(){
    let password = this.userRegisterForm.value.password;
    let confirm_password = this.userRegisterForm.value.confirmpassword;
    if(password === confirm_password){
      this.passwordMatch = true;
    }else{
      this.passwordMatch = false;
    }
  }

  registerUser(){
    let data = this.userRegisterForm.value;
    data['email'] = this.userEmail;

    return this.httpClient.post<any>(`${this.API_URL}/api/users/register-user`, data)
      .subscribe((res: any) => {
        console.log(res)
        
        if(res.status == 1){
          this.userRegisterForm.reset();
          this.authService.logoutUser();
        }
      })
  }
}
