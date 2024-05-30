import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { UserLdap } from "../models/user-ldap";
import { MatPaginator } from "@angular/material/paginator";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { UsersService } from "../service/users.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css']
})
export class LdapListComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource: MatTableDataSource<UserLdap> = new MatTableDataSource<UserLdap>([]);
  unactiveSelected = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private usersService: UsersService, private router: Router) {
    this.paginator = null;
  }

  edit(login:string):void {

    this.router.navigate (['user/', login]).then((e:boolean) :void => {
      if(!e){
        console.error('Navigation has failed');
      }
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);
    this.getUsers();
  }

  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter.toLowerCase());
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser(){
    this.router.navigate(['/user/add']).then((e)=>{
      if(!e) {
        console.log('Navigation has failed')
      }
    });
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      if (this.unactiveSelected) {
        this.dataSource.data = users.filter(user => !user.active);
      } else {
        this.dataSource.data = users;
      }
    });
  }


  unactiveChanged($event: MatSlideToggleChange): void {
    this.unactiveSelected = $event.checked;
    this.getUsers(); // Déplacer l'appel de getUsers() ici
  }
}
