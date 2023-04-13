import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncButtonComponent } from './async-button/async-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AsyncButtonComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AsyncButtonComponent],
})
export class WidgetModule {}
