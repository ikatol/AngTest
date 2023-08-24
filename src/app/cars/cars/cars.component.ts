import { Component, OnDestroy, OnInit } from '@angular/core';
import { Car } from '../car.model';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
import { CarEditDeleteService } from './car-edit-delete.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, OnDestroy {

  constructor(private carService: CarsService, private router: Router, private carEditDeleteService: CarEditDeleteService) { }
  
  cars: Car[] = [];

  private ngUnsubscribeCarData = new Subject();

  ngOnInit() {
    this.fetchCarData();
  }

  openEditing(index: number) {
    this.carEditDeleteService.setCarToEdit(this.cars[index]);
    this.router.navigate(["/cars/edit"]);
  }

  fetchCarData() {
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
  }

  refreshData() {
    this.fetchCarData();
  }

  ngOnDestroy() {
    this.ngUnsubscribeCarData.next(null);
    this.ngUnsubscribeCarData.complete();
  }
}
