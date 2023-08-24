import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapViewComponent } from './map-view/map-view.component';
import { CarListComponent } from './car-list/car-list.component';
import { MapDataService } from './map-data.service';



@NgModule({
  declarations: [
    MapComponent,
    MapViewComponent,
    CarListComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MapComponent
  ],
  providers: [
    MapDataService
  ]
})
export class MapModule { }
