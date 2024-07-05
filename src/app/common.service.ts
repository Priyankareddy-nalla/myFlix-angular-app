import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from './fetch-api-data.service';
import { GenreDetailsComponent } from './genre-details/genre-details.component';
import { DirectorDetailsComponent } from './director-details/director-details.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  movies: any[] = [];
  favoriteMovieList: any[] = [];


  constructor(public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService

  ) { }


  openGenreDialog(genre: { Name: string; Description: string }): void {
    this.dialog.open(GenreDetailsComponent, {
      data: {
        name: genre.Name,
        description: genre.Description
      },
      width: 'auto',
    });
  }


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


  openMovieDetailsDialog(movie: { Title: string; Description: string }): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        name: movie.Title,
        description: movie.Description
      },
      width: 'auto',
    });
  }


  // get all movies
  getMovies(): void {
    const setToken = (localStorage.getItem('token'));

    this.fetchApiData.getAllMovies(setToken).subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      // Update favorite movies after fetching all movies
      this.updateFavoriteMovieList();
      return this.movies;

    });
  }

  // update Fav movies list
  updateFavoriteMovieList(): void {
    const loggeduser = localStorage.getItem('userName');
    this.fetchApiData.getUserByUsername(loggeduser).subscribe((user: any) => {
      // Filter movies based on user's favorite movie IDs
      this.favoriteMovieList = this.movies.filter(m => user.FavoriteMovies.includes(m._id));
      console.log("favlis:" + this.favoriteMovieList);
    });
  }

  isFavorite(movieId: any): boolean {
    return this.favoriteMovieList.some(movie => movie._id === movieId);
  }

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie._id)) {
      this.removeFavMovie(movie._id);
    } else {
      this.addFavMovie(movie._id);
    }
  }

  addFavMovie(movieId: any): void {
    const loggeduser = localStorage.getItem('userName');
    const setToken = localStorage.getItem('token');

    this.fetchApiData.addFavoriteMovie(loggeduser, movieId, setToken).subscribe(
      (result) => {
        console.log(result);
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

  removeFavMovie(movieId: any): void {
    const loggeduser = localStorage.getItem('userName');
    const setToken = localStorage.getItem('token');

    this.fetchApiData.deleteFavoriteMovie(loggeduser, movieId, setToken).subscribe(
      (result) => {
        console.log(result);
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

