import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Skill } from '../../../core/model/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private http = inject(HttpClient)
  private auth = inject(AuthService)

  skills = signal<Skill[] | null>(null)

  constructor() { }

  store(skill : {name: string}){
    this.http.post(`${this.auth.host}/api/skill/create`, skill, {withCredentials: true})
    .subscribe({
      next: response => {
        console.log(response),
        this.getSkills()
      },
      error: error => {
        console.error("Failed to create Skill")
        console.error(error)
      }
    })
  }

  getSkills(){
    this.http.get<{message: string, skills: Skill[]}>(`${this.auth.host}/api/skill`, {withCredentials: true})
    .subscribe({
      next: response =>{
        console.log(response)
        const skills = response.skills.map(skill => new Skill(skill))
        this.skills.set(skills)
      },
      error: error => {
        console.error("Failed to retrieve skills")
        console.error(error)
      }
    })
  }

  deleteSkill(skillId : any){
    const argType = typeof skillId
    if (!['string', 'number'].some(type => type == argType)){
      throw Error(`${argType} is not a valid Skill id`)
    }
    this.http.post(`${this.auth.host}/api/skill/${skillId}`, null,{withCredentials: true})
    .subscribe({
      next: response => {
        console.log(response)
        this.getSkills()
      },
      error: error => {
        console.log('Failed to remove Skill'),
        console.log(error)
      }
    })
  }
}
