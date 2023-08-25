import { Component, OnDestroy, OnInit } from '@angular/core';
import { Car, CarCoords } from '../car.model';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
import { CarEditDeleteService } from './car-edit-delete.service';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, OnDestroy {

  constructor(private carsService: CarsService, private router: Router, private carEditDeleteService: CarEditDeleteService) { }
  
  cars: CarCoords[] = [];

  private ngUnsubscribeCarData = new Subject();

  ngOnInit() {
    this.fetchCarData();
  }

  openEditing(index: number) {
    this.carEditDeleteService.setCarToEdit(this.cars[index]);
    this.router.navigate(["/cars/edit"]);
  }

  /* fetchCarData() {
    this.carService.getCars1().pipe(takeUntil(this.ngUnsubscribeCarData))
      .subscribe({
        next: (data) => {
          this.cars = data;
        },
        error: (error) => {
          console.log("Error fetching car data", error);
        },
        complete: () => {
          console.log("Car Data fetching completed.");
        }
      })
  } */

  async fetchCarData() {
    try {
      this.cars = await firstValueFrom(this.carsService.getCarCoords().pipe(takeUntil(this.ngUnsubscribeCarData)));
    } catch (error) {
      console.log("Error fetching car data", error);
    }
  }

  refreshData() {
    this.fetchCarData();
  }

  ngOnDestroy() {
    this.ngUnsubscribeCarData.next(null);
    this.ngUnsubscribeCarData.complete();
  }
}
