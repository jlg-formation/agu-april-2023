import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IconDefinition,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, finalize, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-async-button',
  templateUrl: './async-button.component.html',
  styleUrls: ['./async-button.component.scss'],
})
export class AsyncButtonComponent {
  @Input()
  action: Observable<void> = of(undefined);
  @Output()
  error = new EventEmitter<Error>();
  @Input()
  icon: IconDefinition = faCircleNotch;
  @Input()
  label: string = '';
  @Output()
  start = new EventEmitter<void>();

  isRunning = false;
  faCircleNotch = faCircleNotch;

  doAction(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.isRunning = true;
      }),
      switchMap(() => {
        return this.action;
      }),
      finalize(() => {
        this.isRunning = false;
      })
    );
  }
}
