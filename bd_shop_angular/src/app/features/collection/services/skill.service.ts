import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private http = inject(HttpClient)
  private auth = inject(AuthService)

  constructor() { }

  store(skill : {name: string}){
    this.http.post(`${this.auth.host}/api/skill/create`, skill, {withCredentials: true})
    .subscribe({
      next: response => console.log(response),
      error: error => {
        console.error("Failed to create Skill")
        console.error(error)
      }
    })
  }
}
