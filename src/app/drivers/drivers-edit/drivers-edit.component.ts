import { Component, OnDestroy, OnInit } from '@angular/core';
import { Driver } from 'src/app/cars/car.model';
import { DriverEditDeleteService } from './driver-edit-delete.service';
import { Router, RouterModule } from '@angular/router';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';

@Component({
  selector: 'app-drivers-edit',
  templateUrl: './drivers-edit.component.html',
  styleUrls: ['./drivers-edit.component.css']
})
export class DriversEditComponent implements OnInit, OnDestroy{
  private driverPlaceholder = new Driver(0, "");
  driver = this.driverPlaceholder;

  constructor(private driverEditDeleteService: DriverEditDeleteService, private router: Router) { }


  private ngUnsubscribeEditDriver = new Subject();
  private ngUnsubscribeDeleteDriver = new Subject();

  status: string = "";
  
  ngOnInit(): void {
    const driverToEdit = this.driverEditDeleteService.getCarRead();
    if (driverToEdit === null) {
      this.returnToDrivers();
    } else {
      this.driver = driverToEdit;
    }
  }

  ngOnDestroy(): void {
    this.driverEditDeleteService.setCarToEdit(null);

    this.ngUnsubscribeEditDriver.next(null);
    this.ngUnsubscribeEditDriver.complete();

    this.ngUnsubscribeDeleteDriver.next(null);
    this.ngUnsubscribeDeleteDriver.complete();
  }

  returnToDrivers() {
    this.router.navigate(['/drivers']);
  }
  applyEdit() {
    this.driverEditDeleteService.setCarToEdit(this.driver);
    this.returnToDrivers();
  }
/*   deleteDriver() {
    this.driverEditDeleteService.deleteDriver();
    this.returnToDrivers();
  } */

  async updateDriver() {
    try {
      const driverToBeEdited = new Driver(this.driver.id, this.driver.name.trim());
      if (driverToBeEdited.name === "") {
        this.status = "Driver name is required";
      } else {
        let success = await firstValueFrom(this.driverEditDeleteService.editDriver(driverToBeEdited).pipe(takeUntil(this.ngUnsubscribeEditDriver)));
        if (success) {
          this.returnToDrivers();
        } else {
          this.status = "Something went wrong, driver not updated";
        }
      }
    } catch (error) {
      console.log("Error updating the driver", error);
    }
  }

  async deleteDriver() {
    try {
        let success = await firstValueFrom(this.driverEditDeleteService.deleteDriver(this.driver.id).pipe(takeUntil(this.ngUnsubscribeDeleteDriver)));
        if (success) {
          this.returnToDrivers();
        } else {
          this.status = "Something went wrong, driver not updated";
        }
    } catch (error) {
      console.log("Error updating the driver", error);
    }
  }
}
