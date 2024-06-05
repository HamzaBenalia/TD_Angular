import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LdapListComponent} from "./ldap-management/ldap-list/ldap-list.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LdapDetailsComponent} from "./ldap-management/ldap-details/ldap-details.component";
import {LdapAddComponent} from "./ldap-management/ldap-add/ldap-add.component";
import {LdapEditComponent} from "./ldap-management/ldap-edit/ldap-edit.component";

const routes: Routes = [
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
