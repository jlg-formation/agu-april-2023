import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';

@Component({
  selector: 'app-test',
  template: ` <input appAutofocus /> `,
})
export class TestComponent {}

@Component({
  selector: 'app-test2',
  template: ` <input appAutofocus="select" value="coucou" /> `,
})
export class Test2Component {}

describe('AutofocusDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Test2Component, AutofocusDirective],
    }).compileComponents();
  });

  it('should create the directive', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const focusedElt = document.activeElement;
    const inputElt = fixture.nativeElement.querySelector('input');
    expect(focusedElt).toBe(inputElt);
  });

  it('should create the directive with select', () => {
    const fixture = TestBed.createComponent(Test2Component);
    fixture.detectChanges();
    const selected = window.getSelection()?.toString();

    expect(selected).toBe('coucou');
  });
});
