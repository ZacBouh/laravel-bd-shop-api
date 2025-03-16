import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';

@Injectable()
export class BookService {

  private http = inject(HttpClient)
  private auth = inject(AuthService)

  constructor() { }

  store(formData : FormData){
    this.http.post(`${this.auth.host}/api/book/create`, formData, {withCredentials: true})
    .subscribe({
      next: response => console.log(response),
      error: error => {
        console.error("Failed to create Book"),
        console.error(error)
      }
    })
  }
}
