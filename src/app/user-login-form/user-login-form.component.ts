import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * User login form component
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent {
  /**
   * Object to hold the user's login data.
   * - `Username`: The user's username.
   * - `Password`: The user's password.
   * This data is two-way bound to the login form input fields and 
   * is sent to the backend for authentication when the user submits the form
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * @param fetchApiData - Fetch data from API.
   * @param dialogRef - Dialog opened reference.
   * @param snackBar - Snackbar notifications.
   * @param router - Routing between pages.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  /**
   * Sends the login form inputs to the backend to authenticate the user.
   * On success, stores user information and token in local storage,
   * closes the dialog, shows a success message, and navigates to the movies page.
   * On failure, shows an error message.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('userName', result.user.Username);
      localStorage.setItem('token', result.token);
      // user Login
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('user login successfully!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (error) => {
      // Handling errors 
      console.error(error);
      this.snackBar.open('User login failed! Please try again.', 'OK', {
        duration: 2000
      });
    });
  }

}
