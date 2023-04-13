import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncButtonComponent } from './async-button/async-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutofocusDirective } from './autofocus.directive';
import { EllipsisPipe } from './ellipsis.pipe';

@NgModule({
  declarations: [AsyncButtonComponent, AutofocusDirective, EllipsisPipe],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AsyncButtonComponent, AutofocusDirective, EllipsisPipe],
})
export class WidgetModule {}
