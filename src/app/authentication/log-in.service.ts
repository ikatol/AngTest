import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { setCurrentUser } from "./auth.service";

@Injectable()
export class LogInService {
    mockUsers = [
        { id: 1, username: 'frankex', password: 'tinytim2', role: 'viewer' },
        { id: 2, username: 'dragutin22', password: 'drogba17', role: 'editor' },
        { id: 3, username: 'hamurabi', password: '123123', role: 'admin' }
    ];

    logIn(userToLogIn: User): boolean {
        const user = this.mockUsers.find(u => u.username === userToLogIn.username && u.password === userToLogIn.password);

        if (user) {
            setCurrentUser(user);
            return true;
        } else {
            return false;
        }
    }
}