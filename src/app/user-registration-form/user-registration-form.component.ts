import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * User-registration form component
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Object to hold the user's registration data.
   * Properties:
   * - `Username`{string}: The user's username.
   * - `Password`{string}: The user's password.
   * - `Email`{string}: The user's email address.
   * - `Birthday`{date}: The user's birthdate.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * user-registration form constructor
   * @param fetchApiData - Fetch data from API.
   * @param dialogRef - Dailog reference to open.
   * @param snackBar - Show notifications in snackbar.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
  }

  /**
   * Sends the registration form inputs to the backend to create a new user.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // user registration 
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000
        });
      },
      (error) => {
        // Handling errors
        console.error(error);
        this.snackBar.open('User registration failed! Please try again.', 'OK', {
          duration: 2000
        });
      }
    );
  }
}


