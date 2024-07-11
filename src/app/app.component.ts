import { Component } from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';

/**
 * Main application component.
 * This is the root component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /**
   * The title of the application.
   */
  title = 'myFlix-Angular';

  /**
   * Constructor for AppComponent.
   * @param fetchApiData - Fetch data from the API.
   */
  constructor( public fetchApidata: FetchApiDataService){}

}
