import { User } from "./user.model";


let mockUser: User | null = null;

//const currentUserSubject = new BehaviorSubject<User | null>(mockUser);

export function getCurrentUser(): User | null {
    return mockUser;
} 

export function setCurrentUser(user: User | null): void {
    mockUser = user;
}