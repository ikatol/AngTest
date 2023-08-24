import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversViewComponent } from './drivers-view/drivers-view.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DriversEditComponent } from './drivers-edit/drivers-edit.component';
import { DriversAddComponent } from './drivers-add/drivers-add.component';



@NgModule({
  declarations: [
    DriversViewComponent,
    DriversEditComponent,
    DriversAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class DriversModule { }
