import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Driver } from 'src/app/cars/car.model';

@Injectable({
  providedIn: 'root'
})
export class AddDriverService {

  constructor(private http: HttpClient) { }

  addDriver(driver: Driver): Observable<boolean> {
    const url = `API/Driver/AddDriver`;
    return this.http.post<Driver>(url, driver).pipe(
        map((response: any) => {
            if (response.success) {
              return true;
            } else {
                console.error('Invalid API response format: ', response);
                return false;
            }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('An error occured: ', error.message);
          return throwError(() => {
              new Error('Something went wrong');
          });
      })
    );
  
  }
}
