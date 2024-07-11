import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from './fetch-api-data.service';
import { GenreDetailsComponent } from './genre-details/genre-details.component';
import { DirectorDetailsComponent } from './director-details/director-details.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

/**
 * Common service for handling movie-related operations and displaying dialogs.
 */
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  /**
   * List of all movies.
   */
  movies: any[] = [];
  /**
   * List of user's favorite movies.
   */
  favoriteMovieList: any[] = [];

  /**
   * CommonService constructor
   * @param dialog - Service to handle dialogs.
   * @param snackBar - Service to display notifications.
   * @param fetchApiData - Fetch data from API.
   */
  constructor(public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService
  ) { }

  /**
   * Opens a dialog to display genre details.
   * @param genre - The genre data to display.
   */
  openGenreDialog(genre: { Name: string; Description: string }): void {
    this.dialog.open(GenreDetailsComponent, {
      data: {
        name: genre.Name,
        description: genre.Description
      },
      width: 'auto',
    });
  }

  /**
   * Opens a dialog to display director details.
   * @param director - The director data to display.
   */
  openDirectorDialog(dircetor: { Name: string; Bio: string; Birth: any }): void {
    this.dialog.open(DirectorDetailsComponent, {
      data: {
        name: dircetor.Name,
        bio: dircetor.Bio,
        birth: dircetor.Birth
      },
      width: 'auto',
      height: 'auto'
    });
  }

  /** 
   * Opens a dialog to display movie details.
   * @param movie - The movie data to display.
   */
  openMovieDetailsDialog(movie: { Title: string; Description: string }): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        name: movie.Title,
        description: movie.Description
      },
      width: 'auto',
    });
  }


  /**
   * Fetche all movies from the API and updates the movie list.
   */
  getMovies(): void {
    const setToken = localStorage.getItem('token');

    this.fetchApiData.getAllMovies(setToken).subscribe((resp: any) => {
      this.movies = resp;
      // Update favorite movies after fetching all movies
      this.updateFavoriteMovieList();
      return this.movies;

    });
  }

  /** 
   * Updates the favorite movie list based on the user's favorite movies.
   */  updateFavoriteMovieList(): void {
    const loggeduser = localStorage.getItem('userName');
    this.fetchApiData.getUserByUsername(loggeduser).subscribe((user: any) => {
      // Filter movies based on user's favorite movie IDs
      this.favoriteMovieList = this.movies.filter(m => user.FavoriteMovies.includes(m._id));
    });
  }

  /**
   * Checks if a movie is in the user's favorite movie list.
   * @param movieId - The ID of the movie to check.
   * @returns True if the movie is a favorite, otherwise false.
   */
  isFavorite(movieId: any): boolean {
    return this.favoriteMovieList.some(movie => movie._id === movieId);
  }

  /**
   * Toggles the favorite status of a movie.
   * @param movie - The movie to toggle favorite status for.
   */
  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie._id)) {
      this.removeFavMovie(movie._id);
    } else {
      this.addFavMovie(movie._id);
    }
  }

  /**
   * Adds a movie to the user's favorite list.
   * @param movieId - The ID of the movie to add.
   */
  addFavMovie(movieId: any): void {
    const loggeduser = localStorage.getItem('userName');
    const setToken = localStorage.getItem('token');

    this.fetchApiData.addFavoriteMovie(loggeduser, movieId, setToken).subscribe(
      (result) => {
        this.snackBar.open('Added to favorites', 'OK', {
          duration: 2000
        });
        // Update favorite list after adding
        this.updateFavoriteMovieList();

      },
      (error) => {
        console.error(error);
        this.snackBar.open('Could not add to favorites', 'OK', {
          duration: 2000
        });
      }
    );
  }

  /**
   * Removes a movie from the user's favorite list.
   * @param movieId - The ID of the movie to remove.
   */
  removeFavMovie(movieId: any): void {
    const loggeduser = localStorage.getItem('userName');
    const setToken = localStorage.getItem('token');

    this.fetchApiData.deleteFavoriteMovie(loggeduser, movieId, setToken).subscribe(
      (result) => {
        this.snackBar.open('Removed from favorites', 'OK', {
          duration: 2000
        });
        // Update favorite list after adding
        this.updateFavoriteMovieList();

      },
      (error) => {
        console.error(error);
        this.snackBar.open('Could not remove from favorites', 'OK', {
          duration: 2000
        });
      }
    );
  }

}

