export class Skill {

  id?: string
  name: string
  created_at?: Date;
  updated_at?: Date;


  constructor(skill : {
    name: string,
    id?: string,
    created_at?: Date,
    updated_at?: Date,
  }){
    this.id = skill.id ?? undefined
    this.name = skill.name
    this.created_at = skill.created_at ? new Date(skill.created_at) : undefined
    this.updated_at = skill.updated_at ? new Date(skill.updated_at) : undefined
  }
}
