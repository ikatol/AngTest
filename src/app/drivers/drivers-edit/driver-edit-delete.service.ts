import { Injectable } from '@angular/core';
import { Driver } from 'src/app/cars/car.model';
import { DriversService } from '../drivers.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DriverEditDeleteService {

  private driverToEdit: Driver | null = null;
  constructor(private driversService: DriversService, private http: HttpClient) { }

  setCarToEdit(driver: Driver | null) {
    this.driverToEdit = driver;
  }

  getCarRead(): Driver | null {
    return this.driverToEdit;
  }

  deleteDriver(id: number): Observable<boolean> {
    /* if (this.driverToEdit !== null)
      this.driversService.deleteDriver(this.driverToEdit.id); */
    const url = `API/Driver/DeleteDriver/${id}`;
    return this.http.delete(url).pipe(
      map((response: any) => {
          if (response.success) {
              return true;
          } else {
              return false;
          }
      })
  );
  }

  editDriver(driver: Driver): Observable<boolean> {
    const url = `API/Driver/UpdateDriver/`;
    return this.http.put(url, driver).pipe(
        map((response: any) => {
            if (response.success) {
                return true;
            } else {
                return false;
            }
        })
    );
  }
}
