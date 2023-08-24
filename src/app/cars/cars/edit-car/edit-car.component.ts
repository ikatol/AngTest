import { Component, OnDestroy, OnInit } from '@angular/core';
import { Car } from '../../car.model';
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
  private carPlaceholder = new Car(0, "", "", 0, 0);
  car = this.carPlaceholder;
  carRegistration: string = "franjo";
  currentYear: number = new Date().getFullYear();

  constructor(private router: Router, private carEditDeleteService: CarEditDeleteService, private carsService: CarsService) { }

  status: string = '';
  deleteSuccess: boolean = false;
  updateSuccess: boolean = false;
  editSuccess: boolean = false;
  cars: Car[] = [];

  private ngUnsubscribeCarData = new Subject();
  private ngUnsubscribeDeleteCar = new Subject();
  private ngUnsubscribeEditCar = new Subject();

  ngOnInit() {
    const carToEdit = this.carEditDeleteService.getCarRead();
    if (carToEdit === null) {
      this.returnToCars();
    } else {
      this.car = carToEdit;
    }
    this.fetchCarData();
  }

  async fetchCarData() {
    try {
      this.cars = await firstValueFrom(this.carsService.getCars1().pipe(takeUntil(this.ngUnsubscribeCarData)));
    } catch (error) {
      console.log("Error fetching car data", error);
    }
  }

  async editCar() {
    try {
        this.cars = await firstValueFrom(this.carsService.getCars1().pipe(takeUntil(this.ngUnsubscribeCarData)));
        const carToBeEdited = new Car(this.car.id, this.car.model.trim(), this.car.registration.trim(), this.car.productionYear, 0);
        if (carToBeEdited.registration === '') {
          this.status = 'Registration is required.';
        } else if (this.cars.some(c => c.registration === carToBeEdited.registration && c.id != carToBeEdited.id)) {
          this.status = 'Registration already taken.';
        } else if (carToBeEdited.model === '') {
          this.status = 'Car model is required.';
        } else if (carToBeEdited.productionYear < 1885 || carToBeEdited.productionYear > this.currentYear) {
          this.status = `Prduction year must be within 1885 and ${this.currentYear}.`;
        } else {
          let success =  await firstValueFrom(this.carEditDeleteService.editCar1(this.car).pipe(takeUntil(this.ngUnsubscribeEditCar)));
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

    this.ngUnsubscribeCarData.next(null);
    this.ngUnsubscribeCarData.complete();

    this.ngUnsubscribeDeleteCar.next(null);
    this.ngUnsubscribeDeleteCar.complete();

    this.ngUnsubscribeEditCar.next(null);
    this.ngUnsubscribeEditCar.complete();
  }

  returnToCars() {
    this.router.navigate(['/cars']);
  }

  deleteCar() {
    this.carEditDeleteService.deleteCar1(this.car.id).subscribe({
      next: (data) => {
        this.deleteSuccess = data;
      },
      error: (error) => {
        console.log("Error deleting the car", error);
      },
      complete: () => {
        console.log("completed.");
        if (this.deleteSuccess)
          this.returnToCars();
        else this.status = "Error deleting";
      }
    });
  }

  async edit() {
    this.editCar();
  }
}
