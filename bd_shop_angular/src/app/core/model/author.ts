import type { Skill } from "./skill"

export class Author {

  id?: string
  firstName: string
  lastName: string
  dateOfBirth?: Date
  dateOfDeath?: Date
  description?: string
  created_at?: Date;
  updated_at?: Date;
  skills?: Skill[]


  constructor(author : {
    id?: string,
    firstName: string,
    lastName: string,
    dateOfBirth?: string | Date,
    dateOfDeath?: string | Date,
    description?: string,
    created_at?: string | Date,
    updated_at?: string | Date,
  }){
    this.firstName = author.firstName
    this.lastName = author.lastName
    this.id = author.id ?? undefined
    this.created_at = author.created_at ? new Date(author.created_at) : undefined
    this.updated_at = author.updated_at ? new Date(author.updated_at) : undefined
    this.dateOfBirth = author.dateOfBirth ? new Date(author.dateOfBirth) : undefined
    this.dateOfDeath = author.dateOfDeath ? new Date(author.dateOfDeath) : undefined
    this.description = author.description ?? undefined
  }
}
