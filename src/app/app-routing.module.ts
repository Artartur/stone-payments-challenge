import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyCardComponent } from './currency-card/currency-card.component';
import { FormResultComponent } from './form-result/form-result.component';

const routes: Routes = [
  {
    path: '',
    component: CurrencyCardComponent,
  },
  {
    path: 'result',
    component: FormResultComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
