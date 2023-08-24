import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/cars/car.model';
import { DriversService } from '../drivers.service';
import { DriverEditDeleteService } from '../drivers-edit/driver-edit-delete.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drivers-view',
  templateUrl: './drivers-view.component.html',
  styleUrls: ['./drivers-view.component.css']
})
export class DriversViewComponent implements OnInit {
  drivers: Driver[] = [];

  constructor(private router: Router, private driversService: DriversService, private driverEditDeleteService: DriverEditDeleteService) {}

  ngOnInit(): void {
    this.driversService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
      },
      error: (error) => {
        console.log("Error fetching car data", error);
      },
      complete: () => {
        console.log("completed.");
      }
    });
    this.driversService.getDrivers();
  }

  openEditing(index: number) {
    this.driverEditDeleteService.setCarToEdit(this.drivers[index]);
    this.router.navigate(["/drivers/edit"]);
  }
}
