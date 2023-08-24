import { Injectable } from '@angular/core';
import { Car } from '../car.model';
import { CarsService } from '../cars.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarEditDeleteService {
  private carToEdit: Car | null = null;
  constructor(private carsService: CarsService, private http: HttpClient) { }

  setCarToEdit(car: Car | null) {
    this.carToEdit = car;
  }

  getCarRead(): Car | null {
    return this.carToEdit;
  }

  deleteCar() {
    if (this.carToEdit !== null)
      this.carsService.deleteCar(this.carToEdit.id);
  }

  deleteCar1(id: number): Observable<boolean>{
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

  editCar1(car: Car): Observable<boolean> {
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
