import { Component, OnDestroy, OnInit } from '@angular/core';
import { Driver } from 'src/app/cars/car.model';
import { DriverEditDeleteService } from './driver-edit-delete.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-drivers-edit',
  templateUrl: './drivers-edit.component.html',
  styleUrls: ['./drivers-edit.component.css']
})
export class DriversEditComponent implements OnInit, OnDestroy{
  private driverPlaceholder = new Driver(0, "");
  driver = this.driverPlaceholder;

  constructor(private driverEditDeleteService: DriverEditDeleteService, private router: Router) { }

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
  }

  returnToDrivers() {
    this.router.navigate(['/drivers']);
  }
  applyEdit() {
    this.driverEditDeleteService.setCarToEdit(this.driver);
    this.returnToDrivers();
  }
  deleteDriver() {
    this.driverEditDeleteService.deleteCar();
    this.returnToDrivers();
  }
}
