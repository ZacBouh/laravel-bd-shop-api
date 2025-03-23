import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillService } from '../../../services/skill.service';

const v = Validators

@Component({
  selector: 'app-add-skill',
  imports: [ReactiveFormsModule],
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.css'
})
export class AddSkillComponent {
  fb =  new FormBuilder()
  skillService = inject(SkillService)

  addSkillForm = this.fb.nonNullable.group({
    name: ['', [v.required]]
  })

  submit(){
    console.log(this.addSkillForm.value)
    this.skillService.store(this.addSkillForm.getRawValue())
  }
}
