import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { IBird } from "./bird";

@Injectable({
  providedIn: 'root'
})
export class BirdService {
 //private birdUrl = '/api/birds/birds.json';  // This works:   Using mock data from birds.json for initial testing
  //  Replace with API url for Web API server
  private birdUrl = 'https://localhost:5001/api/Bird';  

  constructor(private http: HttpClient) { }

  // TODO: Once this angular client is working, replace this test harness with
  //             data from the  Web API service( which gets the real data from the localdb database)
  // The service to read in the bird test data from json
  // Used in webpage and sent to console for debug prints
  // Subscribed to in bird-list.component.ts
    /** GET birds from the server */
  getBirds(): Observable<IBird[]> {   // RCGNOTE 082521: Getting 404 not found...  Server running at 5001
    return this.http.get<IBird[]>(this.birdUrl).pipe(
      tap( data => console.log('All: ', JSON.stringify(data))),  //  completeHandler: The tap line happens later after the http.get returns with the data
      catchError(this.handleError)
    );
  }

   //  HTTP is a request/response protocol. You make a request, it returns a single response.
    //  All HttpClient methods return an RxJS Observable of something.
    //  An observable from HttpClient always emits a single value and then completes, never to emit again.
  /** GET heroes from the server */
  // getHeroes(): Observable<Hero[]> {  // The server's data API determines the shape of the JSON data. , Here a Hero json data array
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched My Cool heroes')),
  //       catchError(this.handleError<Hero[]>('getHeroes', []))
  //     );
  // }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
