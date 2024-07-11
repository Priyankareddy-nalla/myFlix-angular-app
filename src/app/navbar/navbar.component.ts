import { Component, OnDestroy } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component for handling the navigation bar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {
  /**
   * Determines whether the navbar is visible.
   */
   
  showNavbar: boolean = true;
  /**
   * Subscription to handle the visibility of the navbar.
   */
  subscription: Subscription;

  /**
   * Constructor for NavbarComponent.
   * @param navbarService - Service to manage navbar functionalities.
   * @param fetApidata - Service to fetch data from the API.
   * @param snackBar - Service to show snack-bar notifications.
   * @param router - Service to navigate between routes.
   */
  constructor(private navbarService: NavbarService,
    public fetApidata: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from the navbar visibility subscription.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  /**
   * Logs out the user by removing their information from local storage and
   * navigating to the welcome page, then reloading the window.
   */
  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    alert("You are going to log out from myFlix.");
    this.router.navigate(['welcome']).then(() => {
      window.location.reload();
    });
  }
}

