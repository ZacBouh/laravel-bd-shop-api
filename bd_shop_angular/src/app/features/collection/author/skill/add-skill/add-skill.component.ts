import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillService } from '../../../services/skill.service';
import { NgFor } from '@angular/common';

const v = Validators

@Component({
  selector: 'app-add-skill',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.css'
})
export class AddSkillComponent {
  fb =  new FormBuilder()
  skillService = inject(SkillService)

  skills = this.skillService.skills

  addSkillForm = this.fb.nonNullable.group({
    name: ['', [v.required]]
  })

  constructor(){
    this.skillService.getSkills()
  }

  submit(){
    console.log(this.addSkillForm.value)
    this.skillService.store(this.addSkillForm.getRawValue())
  }
}
