import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-basemap',
  templateUrl: './basemap.component.html',
  styleUrls: ['./basemap.component.css']
})
export class BasemapComponent implements OnInit {
  userRole: string;
  isSideNavCollapsed: any;

  constructor(
    public router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('user_role')
  }

  onToggleSideNav(data){
    this.isSideNavCollapsed = data.collapsed;
  }
  logoutUser(){
    this.authService.logoutUser();
  }
}
