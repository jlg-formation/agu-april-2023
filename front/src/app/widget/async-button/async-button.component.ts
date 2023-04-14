import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IconDefinition,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, catchError, finalize, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-async-button',
  templateUrl: './async-button.component.html',
  styleUrls: ['./async-button.component.scss'],
})
export class AsyncButtonComponent {
  @Input()
  action: Observable<void> = of(undefined);
  @Output()
  err = new EventEmitter<Error>();
  @Input()
  icon: IconDefinition = faCircleNotch;
  @Input()
  label = '';
  @Output()
  trigger = new EventEmitter<void>();

  isRunning = false;
  faCircleNotch = faCircleNotch;

  doAction(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.isRunning = true;
        this.trigger.emit();
      }),
      switchMap(() => {
        return this.action;
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.err.emit(err);

        return of(undefined);
      }),
      finalize(() => {
        this.isRunning = false;
      })
    );
  }
}
