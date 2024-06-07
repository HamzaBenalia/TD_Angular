import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "./authentication.service";




export const AuthGuard=()=> {
  const router = inject(Router);

  if(! AuthenticationService.isLoggedIn()){
    router.navigate(['/login']).then( (e ) => {
      if (!e){
        console.error('Navigation has failed');
      }
    });
   return false
  }
  return true
};
