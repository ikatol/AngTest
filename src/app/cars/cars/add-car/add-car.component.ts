import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../cars.service';
import { Car, FullCar } from '../../car.model';
import { Router } from '@angular/router';
import { CarAdditionService } from './car-addition.service';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  newCar: Car = new Car(0, "", "", 1885, 0);
  currentYear: number = new Date().getFullYear();

  constructor(private carAdditionService: CarAdditionService, private carsService: CarsService, private router: Router) { }

  status: string = '';

  cars: Car[] = [];

  success: boolean = false;

  addCar() {
    this.carsService.getCars1().subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (error) => {
        console.log("Error adding the car", error);
      },
      complete: () => {
        console.log("completed.");
        this.add();
      }
    });
    this.carsService.getCars1();
  }

  private add() {
    const carToBeAdded = new Car(this.newCar.id, this.newCar.model.trim(), this.newCar.registration.trim(), this.newCar.productionYear, 0);
    if (carToBeAdded.registration === '') {
      this.status = 'Registration is required.';
    } else if (this.cars.some(c => c.registration === carToBeAdded.registration)) {
      this.status = 'Registration already taken.';
    } else if (carToBeAdded.model === '') {
      this.status = 'Car model is required.';
    } else if (carToBeAdded.productionYear < 1885 || carToBeAdded.productionYear > this.currentYear) {
      this.status = `Prduction year must be within 1885 and ${this.currentYear}.`;
    } else {
      this.carAdditionService.addCar(carToBeAdded).subscribe({
        next: (data) => {
          this.success = data;
        },
        error: (error) => {
          console.log("Error adding the car", error);
        },
        complete: () => {
          console.log("Adding completed.");
          if (this.success) {
            this.router.navigate(['/cars']);
          }
          else {
            this.status = "Failed to add car.";
          } 
        }
      });
    }
  }
}