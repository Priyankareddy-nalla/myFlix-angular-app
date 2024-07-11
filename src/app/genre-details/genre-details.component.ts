import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying the details of genre.
 */
@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrl: './genre-details.component.scss'
})
export class GenreDetailsComponent implements OnInit {
  /**
   * Object to hold genre details.
   */
  genreDetails: any = {};

  /**
   * Constructor for GenreDetailsComponent.
   * @param data -The data passed to the dialog, containing the genre name.
   * @param fetchApiData - Service to fetch data from the API.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: FetchApiDataService
  ) { }

  /**
   * Fetche the genre details.
   */
  ngOnInit(): void {
    this.getGenreDetails();
  }

  /**
   * Fetche the genre details from the API and assigns them to the `genreDetails` object.
   */
  getGenreDetails(): void {
    const setToken = localStorage.getItem('token');
    this.fetchApiData.getGenreDetails(setToken, this.data.name).subscribe((resp) => {
      this.genreDetails = resp;
    });
  }

}
