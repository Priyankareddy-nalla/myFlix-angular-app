import { Component, OnDestroy } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {

  showNavbar: boolean = true;
  subscription: Subscription;


  constructor(private navbarService: NavbarService,
    public fetApidata: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

