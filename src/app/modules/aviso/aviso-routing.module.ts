import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisoPage } from './pages/aviso/aviso.page';
import { NovoAvisoPage } from './pages/novo-aviso/novo-aviso.page';

const routes: Routes = [
  {path: '', component: AvisoPage},
  {path: 'novo', component: NovoAvisoPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisoRoutingModule { 
  static components = [AvisoPage]
}
