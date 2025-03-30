import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { SkillService } from '../../services/skill.service';
import { AuthorService } from '../../services/author.service';
import { NgFor } from '@angular/common';

const v = Validators

@Component({
  selector: 'app-add-author',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css'
})
export class AddAuthorComponent {

  auth = inject(AuthService)
  skillsService = inject(SkillService)
  authorService = inject(AuthorService)
  formBuilder = new FormBuilder()
  authors = this.authorService.authors

  constructor(){
    this.authorService.getAuthors()
  }

  addAuthorForm = this.formBuilder.nonNullable.group({
    firstName: ['', [v.required]],
    lastName: ['', [v.required]],
    dateOfBirth: [''],
    dateOfDeath: [''],
    description : ['']
  })

  submit(){
    console.log(this.addAuthorForm.value)
    this.authorService.store(this.addAuthorForm.getRawValue())
  }

  deleteAuthor(authorId: string | undefined){
    if(authorId){
      this.authorService.deleteAuthor(authorId)
    }
  }
}
