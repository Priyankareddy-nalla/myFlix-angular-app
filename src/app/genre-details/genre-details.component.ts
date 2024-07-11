import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrl: './genre-details.component.scss'
})
export class GenreDetailsComponent implements OnInit {


  genreDetails: any ={};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    this.getGenreDetails();
  }

  getGenreDetails(): void {
    const setToken = localStorage.getItem('token');
    this.fetchApiData.getGenreDetails(setToken, this.data.name).subscribe((resp) => {
      this.genreDetails = resp;
    });
  }

}
