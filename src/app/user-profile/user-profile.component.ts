import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../common.service';
import { MatDialog } from '@angular/material/dialog';

/**
 * User-profile Component
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  /**
   * Object to hold the user's profile data.
   * Properties:
   * - `Username`{string}: The user's username.
   * - `Password`{string}: The user's password.
   * - `Email`{string}: The user's email address.
   * - `Birthday`{date}: The user's birthdate.
   * - `FavoriteMovies`{any}: Array of user's favorite movies.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };
  /**
   * Holds the details of the user.
   */
  userDetails: any;
  /**
   * Holds the ID of the movie.
   */
  movieId: any;
  /**
   * Holds the array of all movies.
   */
  movies: any[] = [];
  /**
   * Holds the array of user's favorite movies.
   */
  favoriteMovies: any[] = [];
  /**
   * Holds the details of a single movie.
   */
  movie: any;

  /**
   * User-profile constructor
   * @param fetchApiData - Fetch data from API.
   * @param snackBar - Show notifications in snackBar.
   * @param commonService  - Common methods/functions like checking if a movie is a favorite. 
   * @param dialog - Dialogs handle.
   */
  constructor(public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public commonService: CommonService,
    public dialog: MatDialog,
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Loads favorite movies and user details.
   */
  ngOnInit(): void {
    this.loadFavoriteMovies();

    /**
     * get user details by username
     */
    const loggedInUsername = (localStorage.getItem('userName')!);
    this.fetchApiData.getUserByUsername(loggedInUsername).subscribe(
      data => {
        this.userDetails = data;
        this.fetchFavoriteMovies(data.FavoriteMovies);
      },
      error => {
        console.error('Error fetching user details', error);
      }
    );
  }

  /**
   * Fetche the user's favorite movies from the API.
   * @param favoriteMovieIds - Array of favorite movie IDs.
   */
  fetchFavoriteMovies(favoriteMovieIds: any[]): void {
    const setToken = (localStorage.getItem('token'));

    this.fetchApiData.getAllMovies(setToken).subscribe(
      (movies: any[]) => {
        this.favoriteMovies = movies.filter(m => favoriteMovieIds.includes(m._id));

      },
      (error) => {
        console.error(error);
        this.snackBar.open('Failed to fetch favorite movies', 'OK', {
          duration: 2000
        });
      });
  }

  /**
   * Sends the updated user details to the backend.
   */
  updateUserDetails(): void {
    const loggeduser = (localStorage.getItem('userName'));
    const setToken = (localStorage.getItem('token'));
    this.fetchApiData.updateUser(loggeduser, this.userData, setToken).subscribe(
      (result) => {
        this.snackBar.open('User updated successfully!', 'OK', {
          duration: 2000
        });
      },
      (error) => {
        // Handling errors
        console.error(error);
        this.snackBar.open('User failed! to update. Please try again.', 'OK', {
          duration: 2000
        });
      }
    );
  }

  /**
   * Deletes the user details from the backend.
   */
  deleteUserDetails(): void {
    const loggedUser = localStorage.getItem('userName');
    const setToken = localStorage.getItem('token');
    this.fetchApiData.deleteUser(loggedUser, setToken)
      .subscribe(
        (response) => {
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
  }

  /**
   * Loads the user's favorite movies from the API.
   */
  loadFavoriteMovies(): void {
    const setToken = localStorage.getItem('token');

    this.fetchApiData.getAllMovies(setToken).subscribe((resp: any) => {
      const allMovies = resp.map((movie: any) => {
        movie.isFavorite = this.isFavorite(movie._id);
        return movie;
      });
      // Filter the movies to include only those that are marked as favorites
      this.movies = allMovies.filter((movie: any) => movie.isFavorite);
    });
  }

  /**
   * Checks if a given movie ID is in the user's list of favorite movies.
   * @param movieId - The ID of the movie to check.
   * @returns True if the movie is a favorite, false otherwise.
   */
  isFavorite(movieId: any): boolean {
    return this.commonService.isFavorite(movieId);
  }

  /**
   * Toggles the favorite status of a movie.
   * @param movie - The movie object to toggle.
   */
  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie._id)) {
      this.commonService.removeFavMovie(movie._id);

    }
  }
}


