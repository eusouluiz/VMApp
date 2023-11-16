import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisoPage } from './pages/aviso/aviso.page';

const routes: Routes = [
  {
    path: '',
    component: AvisoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisoRoutingModule {}
