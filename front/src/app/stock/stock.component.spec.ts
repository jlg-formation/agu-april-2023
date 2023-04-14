import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockComponent } from './stock.component';
import { WidgetModule } from '../widget/widget.module';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

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
});
