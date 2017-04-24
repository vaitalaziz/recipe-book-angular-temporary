import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  
  @HostBinding('class.open') isOpen = false; // binding css class open
  @HostListener('click') onOff(){
      this.isOpen = !this.isOpen; 
  }

  constructor() { }

}
