import { Location } from '@angular/common';
import { MatPaginator } from "@angular/material/paginator";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import {CdkTableDataSourceInput} from "@angular/cdk/table";
import {ActivatedRoute, Router} from "@angular/router";
import {UserLdap} from "../../models/user-ldap";
import {UsersService} from "../../service/users.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmValidParentMatcher, passwordMatchingValidator} from "./passwords-validator-directive";
import {Directive, Injectable} from "@angular/core";
//
// @Component({
//   selector: 'app-ldap-details',
//   templateUrl: './ldap-details.component.html',
//   styleUrls: ['./ldap-details.component.css']
// })


export abstract class LdapDetailsComponent {
  passwordPlaceHolder:string;
  errorMessage='';
  user: UserLdap | undefined;
  processLoadRunning : boolean = false;
  processValidateRunning : boolean = false;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  userForm: FormGroup = this.fb.group({

    login: [''],
    nom: [''],
    prenom: [''],

  // groupe de données imbriquées

  passwordGroup: this.fb.group( {
    password : [''],
    confirmPassword : ['']
}, {validators: passwordMatchingValidator}),
mail:{value:'', disabled: true},
});

  protected get passwordForm() {return this.userForm.get('passwordGroup');}



  protected constructor(
    public addForm: boolean,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : '(valid si inchangé)');
    if (this.addForm){
      this.passwordForm?.get('password')?.addValidators(Validators.required);
      this.passwordForm?.get('confirmPassword')?.addValidators(Validators.required);
    }
  }


  protected OnInit(): void {

  }



  protected goToLdap(): void{
    this.router.navigate(['/users/list']).then((e:boolean): void =>{
      if(!e){
        console.error('Navigation has failed')
      }
    });
  }

  protected onSubmitForm() : void {
    this.validateForm();
  }

  protected isFormValid(): boolean {
    return this.userForm.valid
      && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  abstract validateForm():void

  private formGetValue(name:string): string {
    const control= this.userForm.get(name);
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
    // this.formSetValue('employeNumero', this.user.employeNumero);
    // this.formSetValue('employeNiveau', this.user.employeNiveau);
    // this.formSetValue('dateEmbauche', this.user.dateEmbauche);
    // this.formSetValue('publisherId', this.user.publisherId);
    // this.formSetValue('active', this.user.active);
  }
protected getUserFromFormControl(): UserLdap{
    return {
      id: this.user === undefined ? undefined : this.user.id,
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
      role:'ROLE_USER'
    };
}


  updateMail(): void {
    const control = this.userForm.get('mail');
    if (control === null) {
      console.error("L'objet 'mail' du formulaire n'existe pas.");
      return;
    }
    control.setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan');
  }


  protected updateLogin(): void {
    const control = this.userForm.get('login');
    if (control === null) {
      console.error("l'objet login du formulair n'existe pas ");
      return;
    }
    control.setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
    this.updateMail()
}

}
