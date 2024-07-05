import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonService } from '../common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovieList: any[] = [];
  movie: any;

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.commonService.getMovies();

  }

  isFavorite(movieId: any): boolean {
    return this.commonService.isFavorite(movieId);
  }

  toggleFavorite(movie: any): void {
    this.commonService.toggleFavorite(movie);
  }
}



