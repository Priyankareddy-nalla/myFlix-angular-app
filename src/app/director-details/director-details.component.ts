import { Component, OnInit,Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrl: './director-details.component.scss'
})
export class DirectorDetailsComponent implements OnInit {
  directorDetails: any ={};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    this.getDirectorDetails();
  }

  getDirectorDetails(): void {
    const setToken = localStorage.getItem('token');
    this.fetchApiData.getDirectorDetails(setToken, this.data.name).subscribe((resp) => {
      this.directorDetails = resp;
    });
  }

}
