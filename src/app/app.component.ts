import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login2'
  currentUser: any;
  

  constructor(
    public router: Router,
    private bnIdle: BnNgIdleService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    

    if(localStorage.getItem('access_token') != null){
      this.autoAuth();
      
      this.bnIdle.startWatching(200).subscribe((res) => {
        if (res) {
         this.authService.logoutUser();
        }
      });
    }
  
  }

  
  autoAuth(){
    const now = new Date;
    this.currentUser = localStorage.getItem('session_expires');
    let expirationDate = new Date(this.currentUser);
    
    const expiresIn = expirationDate.getTime() - now.getTime()

    // console.log(expiresIn)
    if(expiresIn> 0){
      
    }else{
      this.authService.logoutUser()
    }
  }
}
