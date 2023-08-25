import { Injectable } from "@angular/core";
import { Car, CarCoords, CarDriver, Driver, FullCar } from "./car.model";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class CarsService {
    k: number = 0;
    cars: Car[] = [
        new Car(this.k++, "Fiat Punto", "reg1", 2005, 7),
        new Car(this.k++, "Grande Punto", "reg2", 2000, 6),
        new Car(this.k++, "BMW MX5", "reg3", 2015, 678),
        new Car(this.k++, "BMW MX6", "reg4", 2009, 86),
        new Car(this.k++, "BMW MX5 M", "reg5", 2005, 67),
        new Car(this.k++, "BMW MX5", "reg6", 2007, 456),
        new Car(this.k++, "BMW MX6 M", "reg7", 2001, 7654)
    ]

    constructor(private http: HttpClient) {}

    getCars(): Observable<Car[]> {
        const url = `API/Car/GetCars`;
        return this.http.get<Car[]>(url).pipe(
            map((response: any) => {
                if (response.success && Array.isArray(response.payload)) {
                    return response.payload.map((carData: any) => new Car(carData.id, carData.model, carData.registration, carData.productionYear, carData.loadCapacityKg));
                } else {
                    console.error('Invalid API response format: ', response);
                    return [];
                }
            })
        );
    }

    getCarCoords(): Observable<CarCoords[]> {
        const url = `/API/Car/GetCarsWithCoordinates`;
        return this.http.get<CarCoords[]>(url).pipe(
            map((response: any) => {
                if (response.success && Array.isArray(response.payload)) {
                    return response.payload.map((carData: any) => new CarCoords(carData.id, carData.model, carData.registration, carData.productionYear, carData.loadCapacityKg, carData.longitude, carData.latitude));
                } else {
                    console.error('Invalid API response format: ', response);
                    return [];
                }
            })
        );
    }

    getCarByRegistration(registration: string) : Observable<Car | null>{
        const url = `API/Car/GetCarByRegistration/${registration}`;
        return this.http.get<Car>(url, { observe: 'response' }).pipe(
            map((response: any) => {
                const carData = response.body.payload;
                return new Car(carData.id, carData.model, carData.registration, carData.productionYear, carData.loadCapacityKg);
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                    return of(null);
                }
                console.error('An error occured: ', error.message);
                return throwError(() => {
                    new Error('Something went wrong');
                });
            })
        );
    }

    getFullCars(): Observable<FullCar[]> {
        const url = `API/Car/GetFullCars`;
        return this.http.get<FullCar[]>(url).pipe(
            map((response: any) => {
                if (response.success && Array.isArray(response.payload)) {
                    return response.payload.map((carData: any) => new FullCar(carData.id, carData.model, carData.registration, carData.productionYear, carData.loadCapacityKg, carData.longitude, carData.latitude, new Driver(carData.driver?.id, carData.driver?.name)));
                } else {
                    console.error('Invalid API response format: ', response);
                    return [];
                }
            })
        );
    }

    /* getCars(): Car[] {
        return this.cars;
    }
    deleteCar(id: number) {
        let index = this.cars.findIndex(c => c.id === id);
        if (index !== -1) {
            this.cars.splice(index, 1);
        }
    }
    editCar(car: Car) {
        let index = this.cars.findIndex(c => c.id === car.id);
        if (index != -1) {
            this.cars[index] = car;
        }
    } */

    /* addCar(car: Car) {
        car.id = this.k++;
        this.cars.push(car);
    } */

    /* checkRegistrationAvailability(registration: string) {
        const cars = this.getCars1();
        return cars.some(c => c.registration === registration);
    } */
}