import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AsyncButtonComponent } from './async-button.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { throwError } from 'rxjs';

describe('AsyncButtonComponent', () => {
  let component: AsyncButtonComponent;
  let fixture: ComponentFixture<AsyncButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeTestingModule],
      declarations: [AsyncButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run the action', fakeAsync(() => {
    component.doAction().subscribe();
    expect(component).toBeTruthy();
  }));

  it('should run the action in error', fakeAsync(() => {
    component.action = throwError(() => new Error('oups'));
    component.doAction().subscribe();
    expect(component).toBeTruthy();
  }));
});
