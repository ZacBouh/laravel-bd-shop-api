export class User {
  id?: string
  name: string
  email: string
  created_at?: Date;
  updated_at?: Date;

  constructor(user :{
    name: string,
    email:string,
    id?: string,
    created_at?: string | Date,
    updated_at?: string | Date
  }){
    this.name = user.name
    this.email = user.email
    this.id = user.id ?? undefined
    this.created_at = user.created_at ? new Date(user.created_at) : undefined
    this.updated_at = user.updated_at ? new Date(user.updated_at) : undefined
  }
}
