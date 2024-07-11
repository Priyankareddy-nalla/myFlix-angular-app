import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonService } from '../common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Movie- card component
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  /**
   * Array to hold the list of movies.
   */
  movies: any[] = [];
  /**
   * Array to hold the list of favorite movies.
   */
  favoriteMovieList: any[] = [];
  /**
   * Holds the current movie information.
   */
  movie: any;
  
  /**
   * Constructor to initialize services.
   * @param fetchApiData - Fetching movie data.
   * @param dialog - Open dialogs. 
   * @param snackBar - Display notifications in snackbar.
   * @param router - Routing to navigate pages.
   * @param commonService - Common service for shared functionalities.
   */
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    public commonService: CommonService
  ) { }
  
  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {
    this.commonService.getMovies();
  }
  
  /**
   * Check if a movie is in the favorite list.
   * @param movieId - The ID of the movie to check.
   * @returns - A boolean indicating if the movie is a favorite.
   */
  isFavorite(movieId: any): boolean {
    return this.commonService.isFavorite(movieId);
  }
  
  /**
   * Toggles the favorite status of a movie.
   * @param movie The movie object to toggle favorite status.
   */
  toggleFavorite(movie: any): void {
    this.commonService.toggleFavorite(movie);
  }
}



