import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Author } from '../../../core/model/author';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  auth = inject(AuthService)
  http = inject(HttpClient)

  authors = signal<Author[] | null>(null)

  constructor() {}

  store(author : Omit<Author, 'dateOfBirth' | 'dateOfDeath'>){
    this.http.post(`${this.auth.host}/api/author/create`, author, {withCredentials: true})
    .subscribe({
      next: response => {
        console.log(response)
        this.getAuthors()
      },
      error: error => {
        console.error("Failed to create Author")
        console.error(error)
      }
    })
  }

  getAuthors(){
    this.http.get<{message: string, authors: Author[]}>(`${this.auth.host}/api/author`, {withCredentials: true})
    .subscribe({
      next: response => {
        console.log(response)
        const authors = response.authors.map(author => new Author(author))
        this.authors.set(authors)
      }
    })
  }

  deleteAuthor(authorId : string){
    this.http.post(`${this.auth.host}/api/author/${authorId}`, null,{withCredentials: true})
    .subscribe({
      next: response => {
        console.log(response)
        this.getAuthors()
      },
      error: error => {
        console.log('Failed to remove Author'),
        console.log(error)
      }
    })
  }
}
