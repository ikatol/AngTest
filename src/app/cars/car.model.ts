export class Car {
    id: number;
    model: string;
    registration: string;
    productionYear: number;
    loadCapacityKg: number;

    constructor(id: number, carModel: string, registration: string, productionYear: number, loadCapacityKg: number) {
        this.id = id;
        this.registration = registration;
        this.model = carModel;
        this.productionYear = productionYear;
        this.loadCapacityKg = loadCapacityKg;
    }
}

export class CarCoords extends Car {
    longitude: number;
    latitude: number;

    constructor(id: number, carModel: string, registration: string, productionYear: number, loadCapacityKg: number, longitude: number, latitude: number) {
        super(id, carModel, registration, productionYear, loadCapacityKg);
        this.longitude = longitude;
        this.latitude = latitude;
    }
}

export class CarDriver extends Car {
    driver: Driver | null;

    constructor(id: number, carModel: string, registration: string, productionYear: number, loadCapacityKg: number, driver: Driver) {
        super(id, carModel, registration, productionYear, loadCapacityKg);
        this.driver = driver;
    }
}

export class FullCar extends CarCoords {
    driver: Driver | null;

    constructor(id: number, carModel: string, registration: string, productionYear: number, loadCapacityKg: number, longitude: number, latitude: number, driver: Driver) {
        super(id, carModel, registration, productionYear, loadCapacityKg, longitude, latitude);
        this.driver = driver;
    }
}

export class Driver {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}