import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavbarService } from '../navbar.service';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

/**
 * Welcome page Component
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  /**
   * Welcome page constructor
   * @param dialog - Dailogs handle.
   * @param navbarService - Navbar functionalities.
   */
  constructor(public dialog: MatDialog,
    private navbarService: NavbarService) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Hides the navbar when the welcome page is initialized.
   */
  ngOnInit(): void {
    //immedieatly hide navbar
    this.navbarService.hide();
  }

  /** 
   * Lifecycle hook that is called when a directive, pipe, or service is destroyed.
   * Displays the navbar when the welcome page is destroyed.
   */
  ngOnDestroy(): void {
    this.navbarService.display();
  }

  /**
   * Opens the user registration dialog when the signup button is clicked.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '300px'
    });
  }

  /**
   * Opens the user login dialog when the login button is clicked.
   */
  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '300px'
    });
  }

}


