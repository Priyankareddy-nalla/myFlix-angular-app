import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying the details of a director.
 */
@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrl: './director-details.component.scss'
})
export class DirectorDetailsComponent implements OnInit {
  /**
   * Object to hold director details.
   */
  directorDetails: any = {};

  /**
   * Constructor for DirectorDetailsComponent.
   * @param data - The data passed to the dialog, containing the director's name.
   * @param fetchApiData - Service to fetch data from the API.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: FetchApiDataService
  ) { }

  /**
   * Fetche the director details.
   */
  ngOnInit(): void {
    this.getDirectorDetails();
  }
  /**
   * Fetche the director details from the API and assigns them to the `directorDetails` object.
   */
  getDirectorDetails(): void {
    const setToken = localStorage.getItem('token');
    this.fetchApiData.getDirectorDetails(setToken, this.data.name).subscribe((resp) => {
      this.directorDetails = resp;
    });
  }
}
