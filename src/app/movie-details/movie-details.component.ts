import { Component, OnInit ,Inject} from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit{
  movieDetails: any = {};


  constructor(   
   @Inject(MAT_DIALOG_DATA) public data: any,
  public fetchApiData: FetchApiDataService,
  public snackBar: MatSnackBar){}


  ngOnInit(): void {
    this.getMovieDetails();
  }


  getMovieDetails(){
    const setToken = localStorage.getItem('token');
    this.fetchApiData.getOneMovie(setToken,this.data.name).subscribe((result) => {
      this.movieDetails= result;
    })
  }

}
