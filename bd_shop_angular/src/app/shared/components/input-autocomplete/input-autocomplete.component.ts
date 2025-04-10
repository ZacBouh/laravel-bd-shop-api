import { Component, signal } from '@angular/core';
import debounce from 'lodash.debounce';

@Component({
  selector: 'app-input-autocomplete',
  imports: [],
  templateUrl: './input-autocomplete.component.html',
  styleUrl: './input-autocomplete.component.css'
})
export class InputAutocompleteComponent {
  value = signal<string>('')
  focused = false
  debouncedHandled = debounce((event : Event) => this.handleInput(event), 300)


  options = [
    {
      label: 'test',
      value: 'test1'
    },
    {
      label: 'tesT',
      value: 'test2'
    },
    {
      label: 'TesT',
      value: 'test3'
    },
  ]

  setFocus(bool : boolean){
    this.focused = bool
  }

  handleInput(event : Event){
        this.value.set((event?.target as HTMLInputElement)?.value)
        console.log((event?.target as HTMLInputElement)?.value)
  }
}
