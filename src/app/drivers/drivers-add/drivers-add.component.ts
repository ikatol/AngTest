import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { Driver } from 'src/app/cars/car.model';
import { AddDriverService } from './add-driver.service';

@Component({
  selector: 'app-drivers-add',
  templateUrl: './drivers-add.component.html',
  styleUrls: ['./drivers-add.component.css']
})
export class DriversAddComponent implements OnDestroy {
  status: string = "";

  ngUnsubscribeAddDriver = new Subject();

  newDriver: Driver = new Driver(0, "");

  constructor(private router: Router, private addDriverService: AddDriverService) {}

  async addCar() {
    try {
      const driverToBeAdded = new Driver(this.newDriver.id, this.newDriver.name);
      if (driverToBeAdded.name === '') {
        this.status = 'Name is required.';
      } else {
        const success = await firstValueFrom(this.addDriverService.addDriver(this.newDriver).pipe(takeUntil(this.ngUnsubscribeAddDriver)));
        if (success) {
          this.redirectToDrivers();
        } else {
          this.status = "Failed to add driver.";
        }
      }
    } catch (error) {
      console.log("Error updating the car", error);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribeAddDriver.next(null);
    this.ngUnsubscribeAddDriver.complete();
  }

  redirectToDrivers() {
    this.router.navigate(['/drivers']);
  }
}
