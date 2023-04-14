import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { StockComponent } from './stock.component';
import { WidgetModule } from '../widget/widget.module';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { a1 } from 'src/test/article.data';
import { throwError } from 'rxjs';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetModule, FontAwesomeTestingModule],
      declarations: [StockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the error', () => {
    component.resetErrorMsg();
    expect(component).toBeTruthy();
  });

  it('should set the error', () => {
    component.setErrorMsg(new Error('coucou'));
    expect(component.errorMsg).toBe('coucou');
  });

  it('should select', () => {
    component.select(a1);
    expect(component.selectedArticles.has(a1)).toBe(true);
  });

  it('should unselect', () => {
    component.selectedArticles = new Set([a1]);
    component.select(a1);
    expect(component.selectedArticles.has(a1)).toBe(false);
  });

  it('should select', fakeAsync(() => {
    component.selectedArticles = new Set([a1]);
    component.remove().subscribe();
    tick(4000);
    expect(component).toBeTruthy();
  }));

  it('should ngInit with error', fakeAsync(() => {
    const refresh = spyOn(component['articleService'], 'refresh');
    refresh.and.returnValue(
      throwError(() => {
        return new Error('oups');
      })
    );
    component.ngOnInit();
    tick(4000);
    expect(component).toBeTruthy();
  }));
});
