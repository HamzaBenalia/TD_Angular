import {Component, OnInit} from '@angular/core';
import {LdapDetailsComponent} from "../ldap-details/ldap-details.component";
import {UsersService} from "../../service/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmValidParentMatcher} from "../ldap-details/passwords-validator-directive";

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-details/ldap-details.component.html',
  styleUrls: ['../ldap-details/ldap-details.component.css']
})
export class LdapEditComponent extends LdapDetailsComponent implements  OnInit{

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    fb: FormBuilder,
    router: Router,
    private snackBar: MatSnackBar)
  {
    super(false, fb,router); // c etait false
  }

   ngOnInit() {
    super.OnInit();
    this.getUser();
  }


  private getUser(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      console.error("can't retrieve user id from URL");
      return;
    }

    const userId = +id;

    if (isNaN(userId)) { // Vérifie si l'ID converti est NaN
      console.error("Invalid user id: ", id);
      this.snackBar.open('ID utilisateur invalide!', 'X');
      return;
    }

    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.copyUserToFormControl();
        console.log('LdapDetails getUser = ', user);
      },
      error: (err) => {
        this.processValidateRunning = false;
        this.errorMessage = "L'utilisateur n'existe pas!";
        console.error('Obtention utilisateur ', err);
        this.snackBar.open('Utilisateur non trouvé!', 'X');
      }
    });
  }


  // private getUser(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //
  //   if(id==null){ // changé login par id
  //     console.error("can't retreive user id from URL");
  //     return;
  //   }
  //   const userId = +id;
  //
  //   this.userService.getUser(userId).subscribe(
  //     {
  //       next: (user) =>{
  //         this.user=user;
  //         this.copyUserToFormControl();
  //         console.log('LdapDetails getUser = ', user);
  //       },
  //       error:(err)=>{
  //         this.processValidateRunning= false;
  //         this.errorMessage= "L'utilisateur n'existe pas!";
  //         console.error('Obtention utilisateur ', err);
  //         this.snackBar.open('utilisateur non trouvé !', 'X')
  //       }
  //     });
  //
  // }

  validateForm(): void{
    console.log('LdapEditComponent  -  ValidateForm');
    this.processValidateRunning=true;
    this.userService.updateUser(this.getUserFromFormControl()).subscribe(
      {
        next: (value)=>{
          this.processValidateRunning = false;
          this.errorMessage = '';
          this.snackBar.open('utilisateur modifié !', 'X');
        },
        error: (err) =>{
          this.processValidateRunning = false;
          this.errorMessage = 'Une erreur est survenue dans la modification !';
          console.error('Modification utilisateur ', err);
          this.snackBar.open('utilisateur non modifié', 'X');
        }
      });
  }

  protected readonly ConfirmValidParentMatcher = ConfirmValidParentMatcher;
  getErroMessage: string | undefined;
}
