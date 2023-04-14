import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { throwError } from 'rxjs';
import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, ReactiveFormsModule],
      declarations: [AddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should guide qty', fakeAsync(() => {
    const inputEl = fixture.debugElement.query(
      By.css('input[formcontrolname="qty"]')
    ).nativeElement;
    inputEl.value = '12';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should guide qty with null value', fakeAsync(() => {
    component.f.controls.qty.setValue(null);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should guide qty on bad value', fakeAsync(() => {
    const inputEl = fixture.debugElement.query(
      By.css('input[formcontrolname="qty"]')
    ).nativeElement;
    inputEl.value = '12x';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should submit', fakeAsync(() => {
    component.submit();
    tick(4000);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should submit in error', fakeAsync(() => {
    const refresh = spyOn(component['articleService'], 'add');
    refresh.and.returnValue(
      throwError(() => {
        return new Error('oups');
      })
    );
    component.submit();
    tick(4000);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
