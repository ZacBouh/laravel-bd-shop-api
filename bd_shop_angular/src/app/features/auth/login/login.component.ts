import { Component,  inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { NgIf, JsonPipe } from '@angular/common';

const v = Validators;

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  auth = inject(AuthService)

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [v.required, v.email]],
    password: ['', [v.required, v.minLength(6)]]
  })

  onSubmit(){
      this.auth.login(this.loginForm.getRawValue())
  }
}
