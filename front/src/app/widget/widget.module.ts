import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncButtonComponent } from './async-button/async-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  declarations: [AsyncButtonComponent, AutofocusDirective],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AsyncButtonComponent, AutofocusDirective],
})
export class WidgetModule {}
