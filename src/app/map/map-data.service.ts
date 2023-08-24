import { Subject } from 'rxjs';


export class MapDataService {
    private markerAdditionSubject = new Subject<[number, number, number]>();
    markerAddition$ = this.markerAdditionSubject.asObservable();

    private markerRemovalSubject = new Subject<number>();
    markerRemoval$ = this.markerRemovalSubject.asObservable();

    addMarker(markId: number, data: [number, number]) {
        this.markerAdditionSubject.next([markId, data[0], data[1]]);
    }

    removeMarker(markId: number) {
        this.markerRemovalSubject.next(markId);
    }
}