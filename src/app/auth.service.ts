import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  API_URL: string = 'http://localhost:5000';
  

  constructor(private httpClient: HttpClient,public router: Router){}

  logoutUser(){
    let email = localStorage.getItem('email');
   
    return this.httpClient.post<any>(`${this.API_URL}/api/auth/refresh_token`,{'email':email})
      .subscribe((res: any) => {
        if(res.status){
          if (localStorage.removeItem('access_token') == null && localStorage.removeItem('session_expires') == null && localStorage.removeItem('email') == null) {
            this.router.navigate(['']);
          }
        }
      })
  }
}