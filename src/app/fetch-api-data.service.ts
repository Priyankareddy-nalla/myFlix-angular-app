import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


const apiUrl = 'https://myflix-app-deh4.onrender.com/';


@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(private http: HttpClient,
    public router: Router,
    public dialog: MatDialog) {
  }

  // API call for user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // API call for user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // API call for user details endpoint
  getUserDetails(): Observable<any> {
    // const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/'
      // headers: new HttpHeaders({
      //   Authorization: 'Bearer ' + token,
      // })
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call for particular user details
  public getUserByUsername(username: any): Observable<any> {
    return this.http.get(apiUrl + 'users/' + username)
      .pipe(
        catchError(this.handleError)
      );
  }


  //API call to update user details
  updateUser(username: any, userData: any, token: any): Observable<any> {
    return this.http.put(apiUrl + 'users/' + username, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // API call to delete user 
  deleteUser(username: any, token: any): Observable<any> {
    console.log("Api Url" + apiUrl + 'users/' + username);
    this.dialog.closeAll();
    alert("deleted " + username);
    this.router.navigate(['welcome']);
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }



  // API call to add a movie to a user's favorite list
  addFavoriteMovie(username: any, movieId: any, token: any): Observable<any> {
    console.log("Api Url " + apiUrl + 'users/' + username + '/movies/' + movieId);
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // API call to delete a movie to a user's favorite list
  deleteFavoriteMovie(username: any, movieId: any, token: any): Observable<any> {
    console.log("Api Url " + apiUrl + 'users/' + username + '/movies/' + movieId);
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // API call to get details of movies by genre
  getGenreDetails(token: any, genreName: string): Observable<any> {
    console.log("Api Url " + apiUrl + 'movies/genre/' + genreName);
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // API call to get details of a director
  getDirectorDetails(token: any, directorName: string): Observable<any> {
    console.log("Api Url " + apiUrl + 'movies/directors/' + directorName);
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // API call to get all movies
  getAllMovies(token: any): Observable<any> {
    // const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }



  // API call to get details of a single movie by title
  getOneMovie(token: any, title: string): Observable<any> {
    console.log("Api Url " + apiUrl + 'movies/' + title);
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }



  // Function to extract response data from API responses
  private extractResponseData(res: object): any {
    const body = res;
    return body || {};
  }

  // Function to handle errors from API calls
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));

  }
}































