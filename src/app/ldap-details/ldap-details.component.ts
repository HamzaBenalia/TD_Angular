import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from "@angular/material/paginator";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import {CdkTableDataSourceInput} from "@angular/cdk/table";
import {ActivatedRoute, Router} from "@angular/router";
import {UserLdap} from "../models/user-ldap";
import {UsersService} from "../service/users.service";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
//
// @Component({
//   selector: 'app-ldap-details',
//   templateUrl: './ldap-details.component.html',
//   styleUrls: ['./ldap-details.component.css']
// })
export class LdapDetailsComponent {
  passwordPlaceHolder:String;
  user: UserLdap | undefined;
  processLoadRunning : boolean = false;
  processValidateRunning : boolean = false;

  userForm: FormGroup = this.fb.group({

    login: [''],
    nom: [''],
    prenom: [''],

  // groupe de données imbriquées

  passwordGroup: this.fb.group( {
    password : [''],
    confirmPassword : ['']
}),
mail:{value:'', disabled: true},
});



  protected constructor(
    public addForm: boolean,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : '(valid si inchangé)');
  }


  protected ngOnInit(): void {

  }



  goToLdap(): void{
    this.router.navigate(['/users/list']).then((e:boolean): void =>{
      if(!e){
        console.error('Navigation has failed')
      }
    });
  }

  onSubmitForm() : void {
    this.validateForm();
  }
  isFormValid(): boolean {
    return this.userForm.valid
      && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  abstract validateForm():void

  private formGetValue(name:string): string {
    const control: AbstractControl<any,any>|null = this.userForm.get(name);
    if (control ===null) {
      console.error("L")
      return ""
    }
    return control.value;
  }

  private formSetValue(name: string, value:string | number ): void {
    const control =this.userForm.get(name);
    if(control === null){
      console.error("L'objet '"+ name + "' du formulaire n'existe pas");
      return;
    }
    control.setValue(value);
  }

  protected copyUserToFormControl(): void {
    if(this.user === undefined){
      return;
    }
    this.formSetValue('login', this.user.login);
    this.formSetValue('nom', this.user.nom);
    this.formSetValue('prenom', this.user.prenom);
    this.formSetValue('mail', this.user.mail);

  }
protected getUserFromFormControl(): UserLdap{
    return {
      login: this.formGetValue('login'),
      nom: this.formGetValue('nom'),
      prenom: this.formGetValue('prenom'),
      nomComplet: this.formGetValue('nom') + '' + this.formGetValue('prenom'),
      mail: this.formGetValue('mail'),
      employeNumero:1,
      employeNiveau:1,
      dateEmbauche:'2020-04-24',
      publisherId:1,
      active:true,
      motDePasse:'',
      role:'Role_USER'
    };
}


  updateMail():void {}


  updateLogin(): void {
    const control = this.userForm.get('login');
    if (control === null) {
      console.error("l'objet login du formulair n'existe pas ");
      return;
    }
    control.setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
    this.updateMail()
}




}
