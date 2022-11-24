import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStoreService } from '../../api/user/user-store.service';
import { UserService } from '../../api/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private userStoreService: UserStoreService
  ) { }

  canActivate(): boolean{
    this.userService.check().pipe().subscribe((data) => {

    })
    if(this.userStoreService.authenticated){
        return false;
    }
    return true;
  } 
}
