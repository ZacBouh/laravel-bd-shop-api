import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { NgIf } from '@angular/common';
import { DropDownMenuComponent, DropDownOption } from '../drop-down-menu/drop-down-menu/drop-down-menu.component';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink, NgIf, DropDownMenuComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  auth = inject(AuthService)
  router = inject(Router)

  adminMenu : DropDownOption<string>[] = [
    {label: 'Add Title', value: '/collection/add'},
    {label: 'Add Skill', value: '/skill/add'},
    {label: 'Messages', value: '/messages'},
  ]

  userMenu : DropDownOption<string>[] = [
    {label: 'Profile', value: '/profile/' + this.auth.user()?.id},
    {label: 'Collection', value: '/profile/' + this.auth.user()?.id},
  ]

  logout(){
    const user = this.auth.user()
    user && this.auth.logout(user)
  }

  handleSelectedMenu(option : DropDownOption<string>){
    this.router.navigate([option.value])
  }
}
