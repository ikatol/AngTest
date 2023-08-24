import { Injectable } from "@angular/core";
import { setCurrentUser } from "../authentication/auth.service";


@Injectable()
export class LogOutService {
    logOut() {
        setCurrentUser(null);
    }
}