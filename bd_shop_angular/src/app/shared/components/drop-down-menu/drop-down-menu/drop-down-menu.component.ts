import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

export type DropDownOption<T> = {
  label: string,
  value:  T
}

@Component({
  selector: 'app-drop-down-menu',
  imports: [NgIf, NgFor],
  templateUrl: './drop-down-menu.component.html',
  styleUrl: './drop-down-menu.component.css'
})
export class DropDownMenuComponent <T = string> {

  isOpen = false
  @Input() options : DropDownOption<T>[] = [
    {label : 'option 1', value: 'option1' },
    {label : 'option 2', value: 'option2' },
    {label : 'option 3', value: 'option3' },
  ] as DropDownOption<T>[]
  @Input() menuName = 'Menu'
  @Output() selectionChange = new EventEmitter<DropDownOption<T>>()
  constructor(private rootRef : ElementRef){}

  @HostListener('document:click', ['$event'])
  handleClick(event : Event){
    if(!this.rootRef.nativeElement.contains(event.target)){
      this.isOpen = false
    }
  }

  toggleDropDown(){
    this.isOpen = !this.isOpen
  }

  selectOption(option : DropDownOption<T>){
    console.log(option)
    this.selectionChange.emit(option)
    this.isOpen = false;
  }
}
