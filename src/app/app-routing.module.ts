import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LogInComponent } from './authentication/log-in/log-in.component';
import { authGuard } from './authentication/auth.guard';
import { HomeComponent } from './home/home.component';
import { DriversViewComponent } from './drivers/drivers-view/drivers-view.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { CarsComponent } from './cars/cars/cars.component';
import { AddCarComponent } from './cars/cars/add-car/add-car.component';
import { EditCarComponent } from './cars/cars/edit-car/edit-car.component';
import { DriversEditComponent } from './drivers/drivers-edit/drivers-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'map',
    //canActivate: [authGuard],
    component: MapComponent,
    //data: { requiredRole: 'editor'}
  },
  {
    path: 'cars',
    component: CarsComponent
  },
  {
    path: 'drivers',
    component: DriversViewComponent
  },
  {
    path: 'cars/add',
    component: AddCarComponent
  },
  {
    path: 'cars/edit',
    component: EditCarComponent
  },
  {
    path: 'drivers/edit',
    component: DriversEditComponent
  },
  {
    path: 'assignments',
    component: AssignmentsComponent
  },
  {
    path: 'login',
    component: LogInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
