import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';

const v = Validators

@Component({
  selector: 'app-add-title',
  imports: [ReactiveFormsModule],
  templateUrl: './add-title.component.html',
  styleUrl: './add-title.component.css'
})
export class AddTitleComponent {

  auth = inject(AuthService)
  bookService = inject(BookService)
  formBuilder = new FormBuilder()
  selectedFiles : File[] = []

  addTitleForm = this.formBuilder.nonNullable.group({
    title: ['', [v.required]],
    author: ['', [v.required]],
    publisher: ['', [v.required]],
    releaseDate: ['', [v.required]],
    description: [''],
    language: ['', [v.required]],
    style: [''],
    collection: ['']
  })

  onFilesSelected(event: Event){
    const input = event.target as HTMLInputElement
    if(input.files && input.files.length > 0){
      this.selectedFiles = [...this.selectedFiles, ...Array.from(input.files)]
      console.log('File selected : ', this.selectedFiles)
    }
  }

  submit(){
    const formData = new FormData()
    Object.entries(this.addTitleForm.value).forEach(([key, value])=>{
      formData.append(key, value)
    })

    this.selectedFiles.forEach((file, index) => {
      formData.append('images[]', file)
    })

    console.log('Formdata ready : ', formData)
    this.bookService.store(formData)
  }
}
