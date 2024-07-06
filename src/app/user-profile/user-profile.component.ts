import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../common.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {


  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };

  userDetails: any;
  movieId: any;
  movies: any[] = [];
  favoriteMovies: any[] = [];
  movie: any;


  constructor(public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public commonService: CommonService,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.loadFavoriteMovies();

    // get user details by username
    const loggedInUsername = (localStorage.getItem('userName')!);
    this.fetchApiData.getUserByUsername(loggedInUsername).subscribe(
      data => {
        this.userDetails = data;
        this.fetchFavoriteMovies(data.FavoriteMovies);
        console.log(" Data  " + data);
      },
      error => {
        console.error('Error fetching user details', error);
      }
    );
  }

  // get Fav movies of user
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

  // This is the function responsible for sending the form inputs to the backend
  updateUserDetails(): void {
    const loggeduser = (localStorage.getItem('userName'));
    const setToken = (localStorage.getItem('token'));
    this.fetchApiData.updateUser(loggeduser, this.userData, setToken).subscribe(
      (result) => {
        console.log(result);
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

  // delete user
  deleteUserDetails(): void {
    const loggedUser = localStorage.getItem('userName');
    const setToken = localStorage.getItem('token');
    this.fetchApiData.deleteUser(loggedUser, setToken)
      .subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
  }

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

  isFavorite(movieId: any): boolean {
    return this.commonService.isFavorite(movieId);
  }

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie._id)) {
      this.commonService.removeFavMovie(movie._id);

    }
  }
}


