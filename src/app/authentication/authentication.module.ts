import { NgModule } from '@angular/core';
import { LogInComponent } from './log-in/log-in.component';
import { LogInService } from './log-in.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LogInComponent
  ], imports: [
    FormsModule
  ],
  providers: [
    LogInService
  ]
})
export class AuthenticationModule { }
