import {Component, OnInit} from '@angular/core';
import {LdapDetailsComponent} from "../ldap-details/ldap-details.component";
import {UsersService} from "../../service/users.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ldap-add',
  templateUrl: '../ldap-details/ldap-details.component.html',
  styleUrls: ['../ldap-details/ldap-details.component.css']
})
export class LdapAddComponent extends LdapDetailsComponent implements OnInit{

  constructor(private userService:UsersService,
              fb: FormBuilder,
              router:Router,
              private snackBar: MatSnackBar) {
    super(false,fb, router);
  }

   ngOnInit() {
    super.OnInit();
  }

  validateForm(): void {
    console.log('LdapAddComponent -  validateForm');
    this.processValidateRunning=true;
    this.userService.addUser(this.getUserFromFormControl()).subscribe({
      next:(value)=>{
        this.processValidateRunning=false;
        this.errorMessage='';
        this.snackBar.open('Utilisateur ajouté ! ', 'X')
      },
      error:(err)=>{
        this.processValidateRunning=false;
        console.error('Ajout utilisateur', err);
        this.errorMessage='L\'utilisateur n\'a pas pu etre ajouté!';
        this.snackBar.open('Erreur dans l\'ajout de l\'utilisateur!', 'X');
    }
    });
  }

}
