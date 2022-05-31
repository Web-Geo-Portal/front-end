import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

// import Map from 'ol/Map.js';
// import View from 'ol/View.js';
// import TileLayer from 'ol/layer/Tile.js';
// import OSM from 'ol/source/OSM.js';
// import TileWMS from 'ol/source/TileWMS.js';
// import ol from 'ol/Overlay';

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
