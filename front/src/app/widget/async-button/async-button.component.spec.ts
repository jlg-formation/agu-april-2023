import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncButtonComponent } from './async-button.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

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
});
