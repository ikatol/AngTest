import { CanActivateFn } from '@angular/router';
import { getCurrentUser } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const requiredRole = route.data.requiredRole;
  const user = getCurrentUser();

  if (user && user.role == requiredRole) {
    return true;
  } else {
    console.log('Access denied!');
    return false;
  }
}
