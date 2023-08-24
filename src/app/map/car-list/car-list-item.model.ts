export class CarListItem {
    id: number;
    model: string;
    longitude: number;
    latitude: number;
    driverName: string;

    constructor(id: number, model: string, longitude: number, latitude: number, driverName: string) {
        this.id = id;
        this.model = model;
        this.longitude = longitude;
        this.latitude = latitude;
        this.driverName = driverName;
    }
}