import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  isOpen: boolean = false;

  @HostListener('click', ['$event']) toggleOpen(event: Event) {

    if(this.isOpen) {
      this.renderer.removeClass((<HTMLElement>this.elemRef.nativeElement).childNodes[1], 'show');
      this.isOpen = !this.isOpen;
    } else {
      this.renderer.addClass((<HTMLElement>this.elemRef.nativeElement).childNodes[1], 'show');
      this.isOpen = !this.isOpen;
    }

  }

  constructor(private elemRef: ElementRef, private renderer: Renderer2) {}

}
