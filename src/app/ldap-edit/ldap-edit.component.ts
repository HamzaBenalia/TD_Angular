import {Component, OnInit} from '@angular/core';
import {LdapDetailsComponent} from "../ldap-details/ldap-details.component";
import {UsersService} from "../service/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-details/ldap-details.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.css']
})
export class LdapEditComponent extends LdapDetailsComponent implements  OnInit{

  constructor(private userService: UsersService, private route: ActivatedRoute,
              fb: FormBuilder,
              router: Router) {
    super(false, fb,router);
  }

  override ngOnInit() {
    super.ngOnInit();
  }


  private getUser(): void {
    const login = this.route.snapshot.paramMap.get('id');
    console.log("getUser" + login);

    if(login==null){
      console.error("can't retreive user id from URL");
      return;
    }

    this.userService.getUser(login).subscribe(
      user => {
        this.user = user;
        console.log("ldapDetails getUser =" + user);
      }
    )

  }

  validateForm(): void{
    console.log('LdapEditComponent  -  ValidateForm');
  }

}
