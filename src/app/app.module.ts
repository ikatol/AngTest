import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';
import { MapModule } from './map/map.module';
import { DriversModule } from './drivers/drivers.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeComponent } from './home/home.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { CarsComponent } from './cars/cars/cars.component';
import { AddCarComponent } from './cars/cars/add-car/add-car.component';
import { EditCarComponent } from './cars/cars/edit-car/edit-car.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarsComponent,
    AssignmentsComponent,
    AddCarComponent,
    EditCarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationBarModule,
    MapModule,
    DriversModule,
    AuthenticationModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
