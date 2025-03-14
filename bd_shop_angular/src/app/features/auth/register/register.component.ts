import { HttpClient } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { ReactiveFormsModule , FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

const v = Validators

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  auth = inject(AuthService)
  formBuiler = new FormBuilder()
  router = inject(Router)

  registerForm = this.formBuiler.nonNullable.group({
    name : ['',  [v.maxLength(255), v.required]],
    email : ['', [v.email, v.required]],
    password : ['', [v.minLength(6), v.required]],
  })

  onSubmit(){
   this.auth.register(this.registerForm.getRawValue())
  }

  loginRedirect = effect(() => {
    if (this.auth.registered()){
      this.router.navigate(['/login'])
    }
  })
}
