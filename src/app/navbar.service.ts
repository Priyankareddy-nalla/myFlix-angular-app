import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  //Behaviorsubject is the library from rxjs that can hold and emmit current status
  showNavbar: BehaviorSubject<boolean>;


  constructor(private router: Router) {
    this.showNavbar = new BehaviorSubject(true);
  }

  hide() {
    this.showNavbar.next(false);
  }
  display() {
    this.showNavbar.next(true);
  }


}
