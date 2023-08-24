import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Driver } from '../cars/car.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private http: HttpClient) {}

  getDrivers(): Observable<Driver[]> {
    const url = `API/Driver/GetDrivers`;
    return this.http.get<Driver[]>(url).pipe(
        map((response: any) => {
            if (response.success && Array.isArray(response.payload)) {
                return response.payload.map((carData: any) => new Driver(carData.id, carData.name));
            } else {
                console.error('Invalid API response format: ', response);
                return [];
            }
            
        })
    );
  }

  deleteDriver(id: number) {

  }
}
