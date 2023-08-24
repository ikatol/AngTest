import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';


import esriConfig from '@arcgis/core/config';
import EsriMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { MapDataService } from '../map-data.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
  
export class MapViewComponent implements OnInit {
  private map!: EsriMap;
  private view!: MapView;
  private markers: { [markerId: number]: Graphic } = [];
  
  @ViewChild('viewDivForMap', { static: true }) private viewDiv!: ElementRef;

  constructor(private renderer: Renderer2, private mapDataService: MapDataService) { 
    this.mapDataService.markerAddition$.subscribe((data: [number, number, number]) => {
      this.handleMarkerAddition(data[0], [data[1], data[2]]);
    });
    this.mapDataService.markerRemoval$.subscribe((markId: number) => {
      this.handleMarkerRemoval(markId);
    });
  }

  ngOnInit(): void {
    esriConfig.apiKey = 'AAPKdeb2fb979bd54952b1d0893fa0a9f611fll-0raQbmtWSVM68cKbSCIi7B6zrrkkjw4h3Zgip_VSm0zFl1ZW0F76YIhT8cQh';

    this.map = new EsriMap({
      basemap: 'arcgis-topographic'
    });

    this.view = new MapView({
      container: this.viewDiv.nativeElement,
      map: this.map,
      center: [15.966568, 45.815399],
      zoom: 12,
      constraints: {
        rotationEnabled: false,
        minZoom: 10,
        maxZoom: 20,
        snapToZoom: true
      },
      ui: {
        components: []
      }
    });
  }

  addMarker(coordinates: [number, number]): Graphic {
    const pointGeometry = new Point({
      longitude: coordinates[0],
      latitude: coordinates[1]
    });
    const markerSymbol = new SimpleMarkerSymbol({
      color: [52, 107, 235],
      outline: {
        color: [36, 51, 189],
        width: 1
      },
      size: 7
    });
    const markerGraphic = new Graphic({
      geometry: pointGeometry,
      symbol: markerSymbol
    });

    this.view.graphics.add(markerGraphic);
    //this.markers.push(markerGraphic);
    return markerGraphic;
  }

  removeMarker(markId: number): void {
    console.log(`Removing ${markId}.`);
    if (markId in this.markers) {
      this.view.graphics.remove(this.markers[markId]);
      delete this.markers[markId];
    }
  }

  handleMarkerAddition(markId: number, data: [number, number]) {
    console.log(`Adding ${markId}, ${data}.`);
    if (markId in this.markers) {
      this.handleMarkerRemoval(markId);
    }
    this.markers[markId] = this.addMarker(data);
  }
  handleMarkerRemoval(markId: number) {
    this.removeMarker(markId);
  }
}
