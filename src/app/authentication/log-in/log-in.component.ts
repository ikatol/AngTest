import { Component } from '@angular/core';
import { LogInService } from '../log-in.service';
import { User } from '../user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  username: string = '';
  password: string = '';

  constructor(private logInService: LogInService, private router: Router) {}

  async login() {
    const userInput: User = {
      id: 1,
      username: this.username,
      password: this.password,
      role: 'editor'
    };

    const result = this.logInService.logIn(userInput);

    if (result) {
      this.router.navigate(['']);
    }
  }
}
