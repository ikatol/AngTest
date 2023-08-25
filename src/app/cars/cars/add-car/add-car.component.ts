import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarsService } from '../../cars.service';
import { Car, CarCoords, FullCar } from '../../car.model';
import { Router } from '@angular/router';
import { CarAdditionService } from './car-addition.service';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnDestroy {
  newCar: CarCoords = new CarCoords(0, "", "", 1885, 0, 0, 0);
  currentYear: number = new Date().getFullYear();

  constructor(private carAdditionService: CarAdditionService, private carsService: CarsService, private router: Router) { }

  status: string = '';

  private ngUnsubscribeCarAdd = new Subject();
  private ngUnsubscribeCheckRegistraion = new Subject();

  ngOnDestroy(): void {
    this.ngUnsubscribeCarAdd.next(null);
    this.ngUnsubscribeCarAdd.complete();

    this.ngUnsubscribeCheckRegistraion.next(null);
    this.ngUnsubscribeCheckRegistraion.complete();
  }
  async addCar() {
    try {
      const carWithTheSameRegistration = await firstValueFrom(this.carsService.getCarByRegistration(this.newCar.registration.trim()).pipe(takeUntil(this.ngUnsubscribeCheckRegistraion)));
      const carToBeAdded = new CarCoords(this.newCar.id, this.newCar.model.trim(), this.newCar.registration.trim(), this.newCar.productionYear, this.newCar.loadCapacityKg, this.newCar.longitude, this.newCar.latitude);
      if (carToBeAdded.registration === '') {
        this.status = 'Registration is required.';
      } else if (carWithTheSameRegistration != null && carWithTheSameRegistration.id !== this.newCar.id) {
        this.status = 'Registration already taken.';
      } else if (carToBeAdded.model === '') {
        this.status = 'Car model is required.';
      } else if (carToBeAdded.productionYear < 1885 || carToBeAdded.productionYear > this.currentYear) {
        this.status = `Prduction year must be within 1885 and ${this.currentYear}.`;
      } else {
        const success = await firstValueFrom(this.carAdditionService.addCar(this.newCar).pipe(takeUntil(this.ngUnsubscribeCarAdd)));
        if (success) {
          this.redirectToCars();
        } else {
          this.status = "Failed to add car.";
        }
      }
    } catch (error) {
      console.log("Error updating the car", error);
    }
    
  }

  redirectToCars() {
    this.router.navigate(['/cars']);
  }
}