import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  latitude: number | any;
  longitude: number | any;

  // constructor() {
  //   this.longitude = 110.377364; // Longitude UGM
  //   this.latitude = -7.770639;   // Latitude UGM
  // }

  public async ngOnInit() {

    // Dapatkan posisi saat ini (opsional)
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    // Buat instance peta
    const map = new Map({
      basemap: "topo-vector"
    });

    //Buat Map View
    const view = new MapView({
      container: "container",
      map: map,
      zoom: 15,
      center: [this.longitude, this.latitude]
    });

    // Buat marker
    const point = new Point({
      longitude: this.longitude,
      latitude: this.latitude
    });

    //Marker simbol
    const markerSymbol = new PictureMarkerSymbol({
      type: 'picture-marker',
      url: 'assets/marker-black.png',
      width: '20px',
      height: '20px'
    });

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    // Tambahkan marker ke view
    view.graphics.add(pointGraphic);

  }
}
