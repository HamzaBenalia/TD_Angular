import { Injectable } from '@angular/core';
import { UserLdap } from "../models/user-ldap";
import { LDAP_USERS } from "../models/ldap-mock-data";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  addUser(user: UserLdap): Observable<UserLdap> {
    this.users.push(user);
    return of(user);
  }

  updateUser(userToUpdate: UserLdap): Observable<UserLdap> {

    const user =this.users.find(u=>u.login ===userToUpdate.login);
    if(user){
      user.nom = userToUpdate.nom;
      user.prenom =userToUpdate.prenom;
      user.nomComplet=userToUpdate.nomComplet;
      user.motDePasse=userToUpdate.motDePasse;

      return of(userToUpdate);
    }
    return throwError(()=> new Error('Utilisateur non trouvé'));
  }
  users: UserLdap[] = LDAP_USERS;

  constructor() { }

  getUsers(): Observable<UserLdap[]> {
    return of(this.users);
  }

  getUser(login: string): Observable<UserLdap> {
    const user: UserLdap | undefined = this.users.find(user => user.login === login);
    if (user !== undefined) {
      return of(user);
    } else {
      return throwError(new Error("Utilisateur non trouvé"));
    }
  }
}
