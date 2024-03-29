import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../../car.model';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarAdditionService {

  constructor(private http: HttpClient) { }

  addCar(car: Car): Observable<boolean> {
    const url = `API/Car/AddCar`;
    return this.http.post<Car>(url, car).pipe(
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
