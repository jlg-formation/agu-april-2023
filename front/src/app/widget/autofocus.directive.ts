import { Directive, ElementRef, Input, OnInit } from '@angular/core';

export type AutofocusMode = 'focus' | 'select';

@Directive({
  selector: 'input[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  @Input()
  appAutofocus: AutofocusMode = 'focus';

  constructor(private readonly elt: ElementRef<HTMLInputElement>) {}
  ngOnInit(): void {
    if (this.appAutofocus === 'select') {
      this.elt.nativeElement.select();
      return;
    }
    this.elt.nativeElement.focus();
  }
}
