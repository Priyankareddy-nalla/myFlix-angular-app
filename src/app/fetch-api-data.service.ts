import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

/**
 * API backend Url
 */
const apiUrl = 'https://myflix-app-deh4.onrender.com/';

/**
 * Service for interacting with the myFlix API.
 */
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  /**
   * Constructor for FetchApiDataService.
   * @param http - HTTP client for making API calls.
   * @param router - Router for navigating between pages.
   * @param dialog - Service for opening dialogs.
   */
  constructor(private http: HttpClient,
    public router: Router,
    public dialog: MatDialog) {
  }

  /**
   * Register a new user.
   * @param userDetails - Details of the user to register.
   * @returns An observable containing the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Log in a user.
   * @param userDetails - Details of the user to log in.
   * @returns An observable containing the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get details of the current user.
   * @returns An observable containing the user details.
   */
  getUserDetails(): Observable<any> {
    return this.http.get(apiUrl + 'users/'
      // headers: new HttpHeaders({
      //   Authorization: 'Bearer ' + token,
      // })
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get details of a user by username.
   * @param username - The username of the user.
   * @returns An observable containing the user details.
   */
  public getUserByUsername(username: any): Observable<any> {
    return this.http.get(apiUrl + 'users/' + username)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update user details.
   * @param username - The username of the user.
   * @param userData - The new user data.
   * @param token - The authentication token.
   * @returns An observable containing the API response.
   */
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


  /**
   * Delete a user.
   * @param username - The username of the user to delete.
   * @param token - The authentication token.
   * @returns An observable containing the API response.
   */
  deleteUser(username: any, token: any): Observable<any> {
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



  /**
   * Add a movie to a user's favorite list.
   * @param username - The username of the user.
   * @param movieId - The ID of the movie to add.
   * @param token - The authentication token.
   * @returns An observable containing the API response.
   */
  addFavoriteMovie(username: any, movieId: any, token: any): Observable<any> {
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Remove a movie from a user's favorite list.
   * @param username - The username of the user.
   * @param movieId - The ID of the movie to remove.
   * @param token - The authentication token.
   * @returns An observable containing the API response.
   */
  deleteFavoriteMovie(username: any, movieId: any, token: any): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Get details of movies by genre.
   * @param token - The authentication token.
   * @param genreName - The name of the genre.
   * @returns An observable containing the genre details.
   */
  getGenreDetails(token: any, genreName: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * Get details of a director.
   * @param token - The authentication token.
   * @param directorName - The name of the director.
   * @returns An observable containing the director details.
   */
  getDirectorDetails(token: any, directorName: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * Get all movies.
   * @param token - The authentication token.
   * @returns An observable containing the list of movies.
   */
  getAllMovies(token: any): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }



  /**
   * Get details of a single movie by title.
   * @param token - The authentication token.
   * @param title - The title of the movie.
   * @returns An observable containing the movie details.
   */
  getOneMovie(token: any, title: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }



  /**
   * Extracts response data from the API response.
   * @param res - The API response.
   * @returns The response data.
   */
  private extractResponseData(res: object): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles errors from API calls.
   * @param error - The error response.
   * @returns An observable throwing an error.
   */
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































