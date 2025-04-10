import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { SkillService } from '../../services/skill.service';
import { AuthorService } from '../../services/author.service';
import { DropDownMenuComponent, DropDownOption } from '../../../../shared/components/drop-down-menu/drop-down-menu/drop-down-menu.component';
import { NgFor } from '@angular/common';
import { Skill } from '../../../../core/model/skill';
import { InputAutocompleteComponent } from '../../../../shared/components/input-autocomplete/input-autocomplete.component';

const v = Validators

@Component({
  selector: 'app-add-author',
  imports: [
    ReactiveFormsModule,
    NgFor,
    DropDownMenuComponent,
    InputAutocompleteComponent
  ],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css'
})
export class AddAuthorComponent {

  auth = inject(AuthService)
  skillsService = inject(SkillService)
  authorService = inject(AuthorService)
  formBuilder = new FormBuilder()
  authors = this.authorService.authors

  skill = this.skillsService.skills
  skillOptions : DropDownOption<Skill | null>[] = this.skill()?.map(skill =>  ({label: skill.name, value: new Skill(skill) })) ?? [{label: 'No skill found', value: null}]

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

  handleSkill(event: DropDownOption<Skill | null>){

  }
}
