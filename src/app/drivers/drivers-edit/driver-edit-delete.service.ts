import { Injectable } from '@angular/core';
import { Driver } from 'src/app/cars/car.model';
import { DriversService } from '../drivers.service';

@Injectable({
  providedIn: 'root'
})
export class DriverEditDeleteService {

  private driverToEdit: Driver | null = null;
  constructor(private driversService: DriversService) { }

  setCarToEdit(driver: Driver | null) {
    this.driverToEdit = driver;
  }

  getCarRead(): Driver | null {
    return this.driverToEdit;
  }

  deleteCar() {
    if (this.driverToEdit !== null)
      this.driversService.deleteDriver(this.driverToEdit.id);
  }
}
