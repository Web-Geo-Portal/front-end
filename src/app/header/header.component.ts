import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  API_URL: string = 'http://localhost:5000';
  userRole: any;
  logo: string;

  constructor(
    public router: Router,
    private httpClient: HttpClient,
  ) { 
    
  }

  ngOnInit(): void {
    this.getHomePage();
    this.userRole = localStorage.getItem('user_role')
  }

  getHomePage(){
    return this.httpClient.get<any>(`${this.API_URL}/api/data/get-images`)
    .subscribe((res: any) => {
      this.logo = res.data.logo.rows[0].background_image;
    })
  }

  logoutUser(){
    let email = localStorage.getItem('email');
   
    return this.httpClient.post<any>(`${this.API_URL}/api/auth/refresh_token`,{'email':email})
      .subscribe((res: any) => {
        if(res.status){
          if (localStorage.removeItem('access_token') == null && localStorage.removeItem('session_expires') == null && localStorage.removeItem('email') == null && localStorage.removeItem('user_role') == null ) {
            this.router.navigate(['']);
          }
        }
      })
  }
}
