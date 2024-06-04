import {Component, OnInit} from '@angular/core';
import {LdapDetailsComponent} from "../ldap-details/ldap-details.component";
import {UsersService} from "../service/users.service";
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
    super(false, fb,router);
  }

   ngOnInit() {
    super.OnInit();
    this.getUser();
  }


  private getUser(): void {
    const login = this.route.snapshot.paramMap.get('id');

    if(login==null){
      console.error("can't retreive user id from URL");
      return;
    }

    this.userService.getUser(login).subscribe(
      {
        next: (user) =>{
          this.user=user;
          this.copyUserToFormControl();
          console.log('LdapDetails getUser = ', user);
        },
        error:(err)=>{
          this.processValidateRunning= false;
          this.errorMessage= "L'utilisateur n'existe pas!";
          console.error('Obtention utilisateur ', err);
          this.snackBar.open('utilisateur non trouvé !', 'X')
        }
      });

  }

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
