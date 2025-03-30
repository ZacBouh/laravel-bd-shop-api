import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component'
import { AddTitleComponent } from './features/collection/add-title/add-title/add-title.component';
import { AddSkillComponent } from './features/collection/author/skill/add-skill/add-skill.component';
import { AddAuthorComponent } from './features/collection/author/add-author/add-author.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'collection/add', component: AddTitleComponent },
  {path: 'skill/add', component: AddSkillComponent },
  {path: 'author/add', component: AddAuthorComponent },
];
