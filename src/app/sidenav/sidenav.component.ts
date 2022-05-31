import { Component, OnInit, Output,EventEmitter } from '@angular/core';
// import { EventEmitter } from 'stream';


interface SideNavToggle{
  screenWidth:Number,
  collapsed: boolean
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  collapsed = false;
  screenWidth = 0;

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapsed(){
    this.collapsed = !this.collapsed
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

  closeSidenav(){
    this.collapsed = false
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

}
