import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/**
 * Service to manage the visibility of the navbar.
 */
@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  /**
   * BehaviorSubject to hold and emit the current status of the navbar visibility.
   */
  showNavbar: BehaviorSubject<boolean>;

  /**
   * NavbarService constructor.
   * @param router - Router for navigating between pages.
   */
  constructor(private router: Router) {
    this.showNavbar = new BehaviorSubject(true);
  }

  /**
   * Hides the navbar by setting the BehaviorSubject to false.
   */
  hide() {
    this.showNavbar.next(false);
  }

  /**
   * Displays the navbar by setting the BehaviorSubject to true.
   */
  display() {
    this.showNavbar.next(true);
  }


}
