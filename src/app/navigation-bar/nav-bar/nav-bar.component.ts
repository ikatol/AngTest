import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getCurrentUser } from 'src/app/authentication/auth.service';
import { LogOutService } from '../log-out.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
  
export class NavBarComponent implements OnInit {
  constructor(private router: Router, private logOutService: LogOutService) { }

  isLoggedIn = getCurrentUser() != null;
  userNameDisplay = getCurrentUser()?.username;
  userRole = getCurrentUser()?.role;
  
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.refreshUserLogged();
      }
    });
  }

  private refreshUserLogged() {
    this.isLoggedIn = getCurrentUser() != null;
    this.userNameDisplay = getCurrentUser()?.username;
    this.userRole = getCurrentUser()?.role;
  }

  logout() {
    this.logOutService.logOut();
  }
}
