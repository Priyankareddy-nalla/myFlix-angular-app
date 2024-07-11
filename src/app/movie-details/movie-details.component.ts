import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  /**
   * Object to hold movie details.
   */
  movieDetails: any = {};

  /**
   * 
   * @param data - The data passed to the dialog, containing the movie name.
   * @param fetchApiData - Service to fetch data from the API.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: FetchApiDataService,
  ) { }
  /**
   * Fetche the movie details.
   */
  ngOnInit(): void {
    this.getMovieDetails();
  }

  /**
   * Fetche the movie details from the API and assigns them to the `movieDetails` object.
   */
  getMovieDetails() {
    const setToken = localStorage.getItem('token');
    this.fetchApiData.getOneMovie(setToken, this.data.name).subscribe((result) => {
      this.movieDetails = result;
    })
  }

}
