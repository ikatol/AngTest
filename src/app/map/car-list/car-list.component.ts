import { Component, OnInit } from '@angular/core';
import { CarListItem } from './car-list-item.model';
import { MapDataService } from '../map-data.service';
import { CarsService } from 'src/app/cars/cars.service';
import { FullCar } from 'src/app/cars/car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  constructor(private mapDataService: MapDataService, private carsService: CarsService) {}
  private i: number = 0;

  selectedCarIndex: number | null = null;

  /* cars: CarListItem[] = [
    new CarListItem(this.i++, 'franko1', 15.990590, 45.810054, 'bozo'),
    new CarListItem(this.i++, 'franko2', 15.992823, 45.806315, 'bozo'),
    new CarListItem(this.i++, 'franko3', 15.978910, 45.810892, 'bozo'),
    new CarListItem(this.i++, 'franko4', 15.969247, 45.807242, 'bozo'),
    new CarListItem(this.i++, 'franko5', 15.957610, 45.810742, 'bozo'),
    new CarListItem(this.i++, 'franko6', 15.958125, 45.805357, 'bozo'),
    new CarListItem(this.i++, 'franko7', 15.914384, 45.810525, 'bozo'),
    new CarListItem(this.i++, 'franko8', 16.024663, 45.832417, 'bozo'),
    new CarListItem(this.i++, 'franko7', 16.040188, 45.798678, 'bozo'),
    new CarListItem(this.i++, 'franko7', 16.002570, 45.776533, 'bozo'),
    new CarListItem(this.i++, 'franko7', 15.967013, 45.777251, 'bozo'),
    new CarListItem(this.i++, 'franko7', 15.923420, 45.765637, 'bozo'),
    new CarListItem(this.i++, 'franko7', 16.056826, 45.735092, 'bozo')
  ]; */

  cars: FullCar[] = [];

  ngOnInit(): void {
    this.carsService.getFullCars().subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (error) => {
        console.log("Error fetching car data", error);
      },
      complete: () => {
        console.log("completed.");
      }
    });
    this.carsService.getFullCars();
  }

  onCarClick(i: number) {
    if (this.selectedCarIndex != null) {
      this.mapDataService.removeMarker(this.cars[this.selectedCarIndex].id);
    }

    this.selectedCarIndex = this.selectedCarIndex == i ? null : i;

    if (this.selectedCarIndex != null) {
      this.mapDataService.addMarker(
        this.cars[this.selectedCarIndex].id,
        [this.cars[this.selectedCarIndex].longitude, this.cars[this.selectedCarIndex].latitude]
      );
    }
  }
}
