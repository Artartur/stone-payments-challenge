import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { CurrencyCardComponent } from './currency-card.component';

describe('CurrencyCardComponent', () => {
  let apiService: ApiService;
  let component: CurrencyCardComponent;
  let fixture: ComponentFixture<CurrencyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyCardComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [ApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyCardComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total correctly for money option', fakeAsync(() => {
    const fakeData = { USDBRL: { high: '5.00' } };
    spyOn(apiService, 'getData').and.returnValue(of(fakeData));
    const navigateToResultSpy = spyOn(component, 'navigateToResult');
    component.inputDollarValue = 50;
    component.inputTaxValue = 5.3;
    component.option = 'dinheiro';

    component.calculate();
    tick();

    expect(component.total.toFixed(2)).toBeCloseTo(266.15, 2);
    expect(navigateToResultSpy).toHaveBeenCalled();
  }));

  it('should calculate total correctly for card option', fakeAsync(() => {
    const fakeData = { USDBRL: { high: '5.00' } };
    spyOn(apiService, 'getData').and.returnValue(of(fakeData));
    const navigateToResultSpy = spyOn(component, 'navigateToResult');
    component.inputDollarValue = 50;
    component.inputTaxValue = 5.3;
    component.option = 'cartão';

    component.calculate();
    tick();

    expect(component.total.toFixed(2)).toBeCloseTo(280.1, 3);
    expect(navigateToResultSpy).toHaveBeenCalled();
  }));
});
