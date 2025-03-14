import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject,  Injectable, signal } from '@angular/core';
import { switchMap } from 'rxjs';
import { User } from '../model/user';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Injectable()
export class AuthService {

  private http = inject(HttpClient)

  host = 'http://localhost:8000'

  user = signal<User | null>(null)
  loading = signal<boolean>(false)
  error = signal<string | null>(null)
  registered = signal<User | null>(null)

  constructor(){
    this.registered.set(null)
    this.http.get<User>(`${this.host}/api/user`, {withCredentials: true})
    .subscribe({
      next: response => {
        console.log('user is logged in name : ' + response.name)
        this.user.set(new User(response))
      },
      error: error => {
        console.log('user is not logged in')
      }
    })
  }

  login( credentials : {email : string , password : string }) {
    this.loading.set(true)
    this.http.get(`${this.host}/sanctum/csrf-cookie`, {withCredentials: true})
    .pipe(switchMap( () => this.http.post<{message: string, user: {name: string, email:string}}>(`${this.host}/api/login`, credentials, {withCredentials: true}) ))
    .subscribe({
      next: response => {
        this.loading.set(false)
        this.user.set(new User(response.user))
        this.registered.set(null)
      },
      error: (error : HttpErrorResponse) => {
        this.loading.set(false)
        this.error.set(error.message)
      }
    })
  }

  register(user : {email: string, name: string, password: string}) {
    this.loading.set(true)
    this.http.get(`${this.host}/sanctum/csrf-cookie`, {withCredentials: true})
    .pipe(switchMap(() =>
      this.http.post<{message:string, user : User}>(`${this.host}/api/register`, user, {withCredentials: true})
    ))
    .subscribe(response =>{
      this.loading.set(false)
      this.registered.set(new User(response.user))
      console.log(response)
    })
  }

  logout(user : User){
    this.http.post<{message: string, user: User}>(`${this.host}/api/logout`, null, {withCredentials: true})
    .subscribe({
      next: response => {
        console.log(response.user.name + ' logged out')
        this.user.set(null)
      }
    })
  }
}
