import { Component, OnDestroy, OnInit } from '@angular/core';
import { Car, CarCoords } from '../../car.model';
import { Router } from '@angular/router';
import { CarEditDeleteService } from '../car-edit-delete.service';
import { CarsService } from '../../cars.service';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit, OnDestroy {
  private carPlaceholder = new CarCoords(0, "", "", 0, 0, 0, 0);
  car = this.carPlaceholder;
  currentYear: number = new Date().getFullYear();

  constructor(private router: Router, private carEditDeleteService: CarEditDeleteService, private carsService: CarsService) { }

  status: string = '';

  private ngUnsubscribeDeleteCar = new Subject();
  private ngUnsubscribeEditCar = new Subject();
  private ngUnsubscribeCheckRegistraion = new Subject();

  ngOnInit() {
    const carToEdit = this.carEditDeleteService.getCarRead();
    if (carToEdit === null) {
      this.returnToCars();
    } else {
      this.car = carToEdit;
    }
  }

  async editCar() {
    try {
        const carWithTheSameRegistration = await firstValueFrom(this.carsService.getCarByRegistration(this.car.registration.trim()).pipe(takeUntil(this.ngUnsubscribeCheckRegistraion)));
        const carToBeEdited = new CarCoords(this.car.id, this.car.model.trim(), this.car.registration.trim(), this.car.productionYear, this.car.loadCapacityKg, this.car.longitude, this.car.latitude);
        if (carToBeEdited.registration === '') {
          this.status = 'Registration is required.';
        } else if (carWithTheSameRegistration !== null && carWithTheSameRegistration.id != carToBeEdited.id) {
          this.status = 'Registration already taken.';
        } else if (carToBeEdited.model === '') {
          this.status = 'Car model is required.';
        } else if (carToBeEdited.productionYear < 1885 || carToBeEdited.productionYear > this.currentYear) {
          this.status = `Prduction year must be within 1885 and ${this.currentYear}.`;
        } else {
          let success =  await firstValueFrom(this.carEditDeleteService.editCar(this.car).pipe(takeUntil(this.ngUnsubscribeEditCar)));
          if (success) {
            this.returnToCars();
          } else {
            this.status = "Something went wrong, car not updated";
          }
        }
    } catch (error) {
      console.log("Error updating the car", error);
    }
  }

  ngOnDestroy(): void {
    this.carEditDeleteService.setCarToEdit(null);

    this.ngUnsubscribeDeleteCar.next(null);
    this.ngUnsubscribeDeleteCar.complete();

    this.ngUnsubscribeEditCar.next(null);
    this.ngUnsubscribeEditCar.complete();

    this.ngUnsubscribeCheckRegistraion.next(null);
    this.ngUnsubscribeCheckRegistraion.complete();
  }

  returnToCars() {
    this.router.navigate(['/cars']);
  }

  async deleteCar() {
    let success =  await firstValueFrom(this.carEditDeleteService.deleteCar(this.car.id).pipe(takeUntil(this.ngUnsubscribeDeleteCar)));
    if (success) {
      this.returnToCars();
    } else {
      this.status = "Something went wrong, car was not deleted";
    }
  }
}
