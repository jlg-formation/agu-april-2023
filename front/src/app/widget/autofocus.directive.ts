import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'input[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  constructor(private readonly elt: ElementRef<HTMLInputElement>) {}
  ngOnInit(): void {
    console.log('this.elt.nativeElement: ', this.elt.nativeElement);
    this.elt.nativeElement.select();
  }
}
