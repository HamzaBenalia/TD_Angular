import { Injectable } from '@angular/core';
import { UserLdap } from "../models/user-ldap";
import { LDAP_USERS } from "../models/ldap-mock-data";
import { Observable, of, throwError } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environments} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = ''; // l’Url d’accès au service :
  private httpOptions = new HttpHeaders({'Content-type': 'application/json'});


  addUser(user: UserLdap): Observable<UserLdap> {
    return this.http.post<UserLdap>(this.usersUrl, user, {
      headers: this.httpOptions
    });
  }

  updateUser(user: UserLdap): Observable<UserLdap> {

    return this.http.put<UserLdap>(this.usersUrl + '/' + user.id, user, {headers: this.httpOptions});
    // const user =this.users.find(u=>u.login ===userToUpdate.login);
    // if(user){
    //   user.nom = userToUpdate.nom;
    //   user.prenom =userToUpdate.prenom;
    //   user.nomComplet=userToUpdate.nomComplet;
    //   user.motDePasse=userToUpdate.motDePasse;
    //
    //
    //   return of(userToUpdate);
    // }
    // return throwError(()=> new Error('Utilisateur non trouvé'));
  }
  users: UserLdap[] = LDAP_USERS;

  constructor(private http: HttpClient) {
    this.usersUrl=environments.userApiUrl;
  }

  getUsers(): Observable<UserLdap[]> {
    return this.http.get<UserLdap[]>(this.usersUrl);
  }

  getUser(id: number): Observable<UserLdap> {
    console.log("login recherché :", id);
    return this.http.get<UserLdap>(this.usersUrl+ '/' + id);
  }

  deleteUser(id: number) {
    return this.http.delete<UserLdap>(this.usersUrl + '/' + id, {headers: this.httpOptions});
  }


}
