import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { setCurrentUser } from "./auth.service";

@Injectable()
export class LogInService {
    mockUsers = [
        { id: 1, username: 'Viewer1', password: '123', role: 'viewer' },
        { id: 2, username: 'Editor1', password: '123', role: 'editor' },
        { id: 3, username: 'Admin1', password: '123', role: 'admin' }
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