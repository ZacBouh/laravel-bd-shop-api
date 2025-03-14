import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink, NgIf],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  auth = inject(AuthService)

  logout(){
    const user = this.auth.user()
    user && this.auth.logout(user)
  }
}
