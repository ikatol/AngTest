import { Injectable } from '@angular/core';
import { Car, CarCoords } from '../car.model';
import { CarsService } from '../cars.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarEditDeleteService {
  private carToEdit: CarCoords | null = null;
  constructor(private carsService: CarsService, private http: HttpClient) { }

  setCarToEdit(car: CarCoords | null) {
    this.carToEdit = car;
  }

  getCarRead(): CarCoords | null {
    return this.carToEdit;
  }

  deleteCar(id: number): Observable<boolean>{
    const url = `API/Car/DeleteCar/${id}`;
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

  editCar(car: CarCoords): Observable<boolean> {
    const url = `API/Car/UpdateCar/`;
    return this.http.put(url, car).pipe(
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
